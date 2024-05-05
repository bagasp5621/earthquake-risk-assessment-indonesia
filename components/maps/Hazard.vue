<template>
  <div
    class="relative h-[94.2vh] w-full overflow-hidden rounded-2xl"
    ref="Interactive"
  ></div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  setup() {
    // Initialize the map container reference
    const Interactive = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      // Create the Leaflet map instance
      const map = L.map(Interactive.value!).setView([-4.44, 119.8], 5);

      // Add a tile layer to the map
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Add a click event listener to the map
      map.on("click", (event: L.LeafletMouseEvent) => {
        // Get clicked coordinates
        const clickedCoords = event.latlng;

        // Create a popup at the clicked coordinates
        L.popup()
          .setLatLng(clickedCoords)
          .setContent(
            `Latitude: ${clickedCoords.lat} <br>Longitude: ${clickedCoords.lng}`
          )
          .openOn(map);
      });
    });

    return { Interactive };
  },
};
</script>
