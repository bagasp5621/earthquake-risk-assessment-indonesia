<script lang="ts">
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, transform } from "ol/proj.js";
import Overlay from "ol/Overlay";
import MapsInteractivePopup from "./Interactive/Popup.vue";
import { usePopupStore } from "../../store/PopupState";

const center = fromLonLat([119.8, -4.44]);

export default {
  name: "MapsInteractive",
  data() {
    return {
      lat: 0,
      lng: 0,
      isMounted: false,
      map: undefined as Map | undefined,
      popup: undefined as Overlay | undefined,
    };
  },
  components: {
    MapsInteractivePopup,
  },
  mounted() {
    this.initMap();
    this.mapDarkMode();
    this.isMounted = true;
    this.mapOverlay();
  },
  beforeUnmount() {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  },
  methods: {
    initMap() {
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
      });
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
    mapOverlay() {
      // Ensure the popup element is available before setting up the overlay
      const popupElement = document.getElementById("popup");
      if (popupElement) {
        this.popup = new Overlay({
          element: popupElement,
          autoPan: true,
          positioning: "bottom-center",
        });

        if (this.popup) {
          // KALO INGET DIPERBAIKI LAGI NANTI, GAK NEMU SOLUSINYA
          // @ts-ignore
          this.map?.addOverlay(this.popup);
          this.map?.on("click", (event) => {
            this.showPopup(event.coordinate);
          });
        }
      } else {
        console.error("Popup element not found");
      }
    },
    showPopup(coordinate: number[]) {
      const store = usePopupStore();

      const [longitude, latitude] = transform(
        coordinate,
        "EPSG:3857",
        "EPSG:4326"
      );

      console.log(coordinate);

      this.lat = latitude;
      this.lng = longitude;

      store.latitude = this.lat;
      store.longitude = this.lng;

      this.popup?.setPosition(coordinate);
    },
    removePopup() {
      this.popup?.setPosition(undefined);
    },
  },
};
</script>

<template>
  <div>
    <div
      ref="map"
      class="relative h-[94.2vh] w-full overflow-hidden rounded-2xl"
    >
      <div id="popup">
        <div v-if="isMounted" class="flex">
          <!-- content -->
          <div class="bg-[#1D1F25] p-4 rounded-xl shadow-md">
            <div class="flex justify-end">
              <button
                @click="removePopup"
                class="py-[0.1rem] px-1.5 border rounded-lg hover:bg-[#4b5052] text-xs"
              >
                X
              </button>
            </div>
            <MapsInteractivePopup />
          </div>
        </div>
        <!-- Loading Skeleton Here -->
        <div v-else>loading...</div>
      </div>
    </div>
  </div>
</template>
