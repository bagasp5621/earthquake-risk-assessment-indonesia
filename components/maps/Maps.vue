<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const zoom = ref(5);
    const maxZoom = 6;
    return { zoom, maxZoom };
  },
};
</script>

<template>
  <div class="relative h-[94.2vh] w-full overflow-hidden rounded-2xl">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="[-4.446935, 119.813054]"
      :maxZoom="maxZoom"
      style="background-color: #272834"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
    </LMap>
  </div>
</template>
