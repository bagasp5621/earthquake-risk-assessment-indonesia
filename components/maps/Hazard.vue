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
      lat: 0,
      lng: 0,
      isMounted: false,
      showModal: false,
      isLoading: false,
      earthquakeData: null as Earthquake | null,
      map: undefined as Map | undefined,
      clickedClusterData: undefined as EarthquakeData | undefined,
    };
  },
  mounted() {
    this.initMap();
    this.isMounted = true;
  },
  beforeUnmount() {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  },
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
                weight: 1,
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

        this.map?.on("click", (event) => {
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
        });

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
      // fromLonLat(minLon);

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
    class="relative h-[94.2vh] w-full overflow-hidden rounded-2xl z-0"
  >
    <div v-if="isMounted">
      <MapsHazardModal
        v-if="showModal"
        @close-modal="handleCloseModal"
        :cluster="clickedClusterData"
        class="absolute inset-0 flex z-10 m-4 rounded-xl overflow-y-auto max-w-[50vh]"
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
