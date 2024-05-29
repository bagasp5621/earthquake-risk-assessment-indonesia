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

const center = fromLonLat([119.8, -4.44]);

interface Earthquake {
  earthquakes: {
    latitude: number;
    longitude: number;
    magnitude: number;
    depth: number;
    datetime: string;
    weight: number;
  }[];
}
[];

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
      map: undefined as Map | undefined,
      clickedClusterData: undefined as Earthquake | undefined,
    };
  },
  mounted() {
    this.initMap();
    this.mapDarkMode();
    this.isMounted = true;
  },
  beforeUnmount() {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  },
  methods: {
    initMap() {
      const data = [
        {
          earthquakes: [
            {
              latitude: -6.7637,
              longitude: 129.36919,
              magnitude: 6.2467558,
              depth: 10,
              weight: 1,
              datetime: "9 Februari 2009",
            },
            {
              latitude: -6.1811867,
              longitude: 130.50633,
              magnitude: 7.1988274,
              depth: 10,
              weight: 1,
              datetime: "9 Februari 2009",
            },
            {
              latitude: -5.3607016,
              longitude: 131.40625,
              magnitude: 6.3083327,
              depth: 10,
              weight: 1,
              datetime: "9 Februari 2009",
            },
            {
              latitude: -7.4897013,
              longitude: 128.8015,
              magnitude: 6.3561951,
              depth: 10,
              weight: 1,
              datetime: "9 Februari 2009",
            },
          ],
        },
        {
          earthquakes: [
            {
              latitude: 1.217826962,
              longitude: 102.0359344,
              magnitude: 6.359391179,
              depth: 10,
              weight: 1,
              datetime: "9 Februari 2009",
            },
            {
              latitude: 0.2970204353,
              longitude: 103.7073822,
              magnitude: 6.255845165,
              depth: 10,
              weight: 1,
              datetime: "9 Februari 2009",
            },
            {
              latitude: 2.25249052,
              longitude: 104.653717,
              magnitude: 6.077113131,
              depth: 10,
              weight: 1,
              datetime: "9 Februari 2009",
            },
            {
              latitude: -0.3118103445,
              longitude: 103.9930115,
              magnitude: 6.037962594,
              depth: 10,
              weight: 1,
              datetime: "9 Februari 2009",
            },
          ],
        },
      ];

      const features: Feature<Point>[] = data.flatMap((cluster) =>
        cluster.earthquakes.map((earthquake) => {
          return new Feature({
            geometry: new Point(
              fromLonLat([earthquake.longitude, earthquake.latitude])
            ),
            magnitude: earthquake.magnitude,
            weight: earthquake.weight,
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
            blur: 20,
            radius: 15,
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
        data.forEach((cluster) => {
          const clusterBoundaries = this.computeClusterBoundaries(cluster); // Compute boundaries

          if (
            this.isClickWithinClusterBounds(clickCoordinate, clusterBoundaries)
          ) {
            this.showModal = true;
            this.clickedClusterData = cluster;
          }
        });
      });
    },
    computeClusterBoundaries(cluster: Earthquake) {
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
    mapDarkMode() {
      this.map?.on("postcompose", () => {
        const canvas = document.querySelector("canvas");
        canvas
          ? (canvas.style.filter =
              "invert(100%) hue-rotate(200deg) brightness(100%) contrast(100%)")
          : "";
      });
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
        :cluster="clickedClusterData"
        class="absolute inset-0 flex z-10 max-h-[10vh] max-w-[20vh] m-4"
      />
    </div>
    <div v-else class="h-[55.75rem]"><LoadingSkeletonMaps /></div>
  </div>
</template>

<!-- todo 
1. initiate openlayers map✅
2. implement heatmap with dummy data✅ note: centroid are excluded
3. implement clickable heatmap with dummy data (resulting modal popup) 
4. integration with api
-->
