<!-- 
todo
1. create map polygon from indonesia provinces geojson and add dummy data to that✅
2. slice the design and add modal
3. enhance the api based on what needed in the modal
4. integrate api with the map
-->

<script lang="ts">
import axios from "axios";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj.js";
import Select from "ol/interaction/Select";
import { pointerMove } from "ol/events/condition";
import Overlay from "ol/Overlay";
import { getProvince } from "~/api/province";
import type { ProvinceData, ProvinceStat } from "~/types/ProvinceStat";

const center = fromLonLat([119.8, -4.44]);

export default {
  data() {
    return {
      map: undefined as Map | undefined,
      isMounted: false as Boolean,
      tooltip: undefined as Overlay | undefined,
      province: "" as string,
      totalEarthquake: 0 as number,
    };
  },
  mounted() {
    this.initMap();
    this.mapDarkmode();
    this.fetchGeoJSONData();
    this.isMounted = true;
  },
  methods: {
    async initMap() {
      const mapElement = this.$refs.map as HTMLElement;
      this.map = new Map({
        target: mapElement,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: center,
          zoom: 5.3,
        }),
        controls: [],
      });

      const provinceData = await getProvince();

      this.addHoverInteraction(provinceData);
    },
    fetchGeoJSONData() {
      axios
        .get(
          "https://raw.githubusercontent.com/ans-4175/peta-indonesia-geojson/master/indonesia-prov.geojson"
        )
        .then((response) => {
          this.addGeoJSONLayer(response.data);
        })
        .catch((error) => {
          console.error("Error fetching GeoJSON data:", error);
        });
    },
    addGeoJSONLayer(geojsonData: any) {
      // Create a vector source from the GeoJSON object
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData, {
          featureProjection: "EPSG:3857", // Use 'EPSG:3857' for web mercator projection
        }),
      });

      // Create a vector layer using the vector source
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // Add the vector layer to the map
      this.map?.addLayer(vectorLayer);
    },
    addHoverInteraction(provinceData: ProvinceStat | null) {
      const select = new Select({
        condition: pointerMove,
        layers: (layer) => layer instanceof VectorLayer, // Apply only to vector layers
      });

      // kok bisa jadi complicated banget, padahal kukira gampang T.T
      select.on("select", (e) => {
        const selectedFeatures = e.target.getFeatures();
        if (selectedFeatures.getLength() > 0) {
          const feature = selectedFeatures.item(0);
          const properties = feature.getProperties();
          this.province = properties.Propinsi;
          provinceData?.data.forEach((data: ProvinceData) => {
            if (data.province === this.province) {
              this.totalEarthquake = data.earthquakeCount;
            }
          });

          const coordinates = feature
            .getGeometry()
            .getClosestPoint(e.mapBrowserEvent.coordinate);

          const tooltipElement = this.$refs.tooltip as HTMLElement;
          this.tooltip = new Overlay({
            element: tooltipElement,
            positioning: "top-center",
            autoPan: true,
          });
          // Problemnya karena tipe dari tooltip adalah semua yang ada di dalam Overlay data type, tapi dia maunya Overlay data type itu sendiri. sebenernya kita bisa rewrite new Overlay didalem addOverlay tapi jadi redundant. kemungkinan gak akan ngebreak code karena semua type-nya sama. dia cuman masalahin wadah type-nya saja. jadi gw pake ts-ignore disini
          // @ts-ignore
          this.map?.addOverlay(this.tooltip);

          tooltipElement.style.display = "block";
          this.tooltip?.setPosition(coordinates);
        } else {
          this.tooltip?.setPosition(undefined);
          const tooltipElement = this.$refs.tooltip as HTMLElement;
          tooltipElement.style.display = "none";
        }
      });

      this.map?.addInteraction(select);
    },
    mapDarkmode() {
      this.map?.on("postcompose", () => {
        const canvas = document.querySelector("canvas");
        canvas
          ? (canvas.style.filter =
              "invert(100%) hue-rotate(200deg) brightness(100%) contrast(100%)")
          : "";
      });
    },
    capitalizeFirstLetter(str: string): string {
      const words = str.split(" ");
      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      return capitalizedWords.join(" ");
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
      <div ref="tooltip" class="bg-[#1D1F25] z-50 rounded-md">
        <div v-if="tooltip" class="p-5">
          <div class>{{ capitalizeFirstLetter(province) }}</div>
          <div class="justify-between">
            <div class="text-sm">
              Total Earthquake:
              <span class="text-[#FF7E35] font-bold">{{
                totalEarthquake
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h-[55.75rem]"><LoadingSkeletonMaps /></div>
  </div>
</template>
