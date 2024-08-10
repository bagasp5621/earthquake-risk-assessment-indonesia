<!-- 
~~~~ BUG ~~~~ 
1. If heatmap is clicked or filter is applied, sidebar doesnt work, it makes the main area not changed.
2. 
 -->

<script lang="ts">
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import { fromLonLat, transform } from "ol/proj.js";
import TileLayer from "ol/layer/Tile";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import HeatmapLayer from "ol/layer/Heatmap";
import type { Coordinate } from "ol/coordinate";
import type { Earthquake, EarthquakeData } from "~/types/Earthquake";
import { getHazard } from "~/api/hazardApi";
import { useContentStore } from "~/store/ContentState";
import { useHazardStore } from "~/store/HazardState";
import { Vector } from "ol/source";

const center = fromLonLat([119.8, -4.44]);

interface ClusterBoundaries {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
}

export default {
  name: "MapsHazard",
  data() {
    return {
      isMounted: false,
      isLoading: false,
    };
  },
  setup() {
    // initiate variable for the app
    const contentStore = useContentStore();
    const hazardState = useHazardStore();
    const earthquakeData = ref(null as Earthquake | null);
    const clickedClusterData = ref(undefined as EarthquakeData | undefined);
    const map = ref(undefined as Map | undefined);
    const mapDupe = ref(undefined as Map | undefined);
    const mapDupeWithHazard = ref(undefined as Map | undefined);
    const showModal = ref(false as Boolean);
    const lat = ref(0 as Number);
    const lng = ref(0 as Number);
    const clickListener = ref(null as ((event: any) => void) | null);

    watch(
      () => hazardState.hazard,
      (newHazard) => {
        if (newHazard) {
          if (map.value instanceof HTMLElement) {
            map.value = mapDupe.value;
          }

          const layers = map?.value?.getLayers();
          const layerArray = layers?.getArray();

          if (layerArray) {
            for (const layer of layerArray) {
              if (layer instanceof HeatmapLayer) {
                map?.value?.removeLayer(layer);
                break;
              }
            }
          }

          const features = hazardState.hazard?.earthquakes.map((data) => {
            return new Feature({
              geometry: new Point(fromLonLat([data.longitude, data.latitude])),
              weight: data.weight,
            });
          });

          const vectorSource = new Vector({
            features: features,
          });

          const layer = new HeatmapLayer({
            source: vectorSource,
            blur: 25,
            radius: 18,
          });

          map.value?.addLayer(layer);
          clickedClusterData.value = hazardState.hazard;
          showModal.value = true;
        }
      }
    );

    watch(
      () => contentStore.content,
      (newContent) => {
        if (!newContent) {
          if (map.value instanceof HTMLElement) {
            map.value = mapDupeWithHazard.value;
          }

          const layers = map?.value?.getLayers();
          const layerArray = layers?.getArray();

          if (layerArray) {
            for (const layer of layerArray) {
              if (layer instanceof HeatmapLayer) {
                map?.value?.removeLayer(layer);
                break;
              }
            }
          }
          // remove click event
          if (clickListener.value) {
            map?.value?.un("click", clickListener.value);
          }
        }
      }
    );

    return {
      earthquakeData,
      clickedClusterData,
      map,
      mapDupe,
      mapDupeWithHazard,
      clickListener,
      showModal,
      lat,
      lng,
    };
  },
  mounted() {
    this.initMap();
    this.isMounted = true;
  },
  // beforeUnmount() {
  //   if (this.map) {
  //     this.map.setTarget(undefined);
  //   }
  // },
  methods: {
    async initMap() {
      this.isLoading = true;
      try {
        const data = await getHazard();
        this.earthquakeData = data;

        const features: Feature<Point>[] | undefined = data?.clusters.flatMap(
          (cluster) =>
            cluster.earthquakes.map((earthquake) => {
              return new Feature({
                geometry: new Point(
                  fromLonLat([earthquake.longitude, earthquake.latitude])
                ),
                magnitude: earthquake.magnitude,
                weight: 0.7,
              });
            })
        );

        const vectorSource = new VectorSource({
          features: features,
        });

        const mapElement = this.$refs.map as HTMLElement;

        this.map = new Map({
          target: mapElement,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new HeatmapLayer({
              source: vectorSource,
              blur: 25,
              radius: 18,
            }),
          ],
          view: new View({
            center: center,
            zoom: 5.3,
          }),
          controls: [],
        });

        // if needed for empty map without heatmap
        this.mapDupe = this.map;

        // click event
        this.clickListener = (event) => {
          const clickCoordinate = event.coordinate; // Get click coordinates
          // Iterate through each area cluster
          data?.clusters.forEach((cluster) => {
            const clusterBoundaries = this.computeClusterBoundaries(cluster); // Compute boundaries
            if (
              this.isClickWithinClusterBounds(
                clickCoordinate,
                clusterBoundaries
              )
            ) {
              this.showModal = true;
              this.clickedClusterData = cluster;
            }
          });
        };

        this.map?.on("click", this.clickListener);

        this.mapDupeWithHazard = this.map;

        // dark mode
        this.map?.on("postcompose", () => {
          const canvas = document.querySelector("canvas");
          canvas
            ? (canvas.style.filter =
                "invert(100%) hue-rotate(200deg) brightness(100%) contrast(100%)")
            : "";
        });
      } catch (error) {
        console.error("Error fetching interactive data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    computeClusterBoundaries(cluster: EarthquakeData) {
      let minLat = Infinity,
        maxLat = -Infinity;
      let minLon = Infinity,
        maxLon = -Infinity;

      // Find minimum and maximum latitude and longitude
      cluster.earthquakes.forEach((earthquake) => {
        minLat = Math.min(minLat, earthquake.latitude);
        maxLat = Math.max(maxLat, earthquake.latitude);
        minLon = Math.min(minLon, earthquake.longitude);
        maxLon = Math.max(maxLon, earthquake.longitude);
      });

      return { minLat, maxLat, minLon, maxLon };
    },

    isClickWithinClusterBounds(
      clickCoordinate: Coordinate,
      boundaries: ClusterBoundaries
    ) {
      const { minLat, maxLat, minLon, maxLon } = boundaries;

      const clickCoordinateLL = transform(
        clickCoordinate,
        "EPSG:3857",
        "EPSG:4326"
      );

      // Check if click coordinates fall within cluster boundaries
      return (
        clickCoordinateLL[0] >= minLon &&
        clickCoordinateLL[0] <= maxLon &&
        clickCoordinateLL[1] >= minLat &&
        clickCoordinateLL[1] <= maxLat
      );
    },
    handleCloseModal() {
      this.showModal = false;
      this.clickedClusterData = undefined;
    },
  },
};
</script>

<template>
  <div
    ref="map"
    class="relative h-[92.3vh] md:h-[96vh] w-full overflow-hidden md:rounded-2xl z-0"
  >
    <div v-if="isMounted">
      <MapsHazardModal
        v-if="showModal"
        @close-modal="handleCloseModal"
        :cluster="clickedClusterData"
        class="absolute inset-0 flex z-10 m-4 rounded-xl overflow-y-auto max-w-[80vh]"
      />
      <MapsHazardFilterModal
        v-if="!showModal"
        class="absolute flex justify-center z-10 m-4 rounded-xl overflow-y-auto"
      />
    </div>
    <div v-else class="h-[55.75rem]"><LoadingSkeletonMaps /></div>
  </div>
</template>

<!-- todo 
1. initiate openlayers map✅
2. implement heatmap with dummy data✅ note: centroid are excluded
3. implement clickable heatmap with dummy data (resulting modal popup) ✅
4. enhance api, add new column to endpoint ✅
5. slicing modal ✅
6. integration with api✅
-->
