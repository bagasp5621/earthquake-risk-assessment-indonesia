<script>
import MapsIcon from "./maps-icon.vue";
import HeatmapIcon from "./heatmap-icon.vue";
import PolygonIcon from "./polygon-icon.vue";
import ChartIcon from "./chart-icon.vue";
import GuideIcon from "./guide-icon.vue";

export default {
  name: "Icons",
  props: {
    isOpen: {
      type: Boolean,
      require: true,
    },
    route: {
      type: String,
      require: true,
    },
  },
  components: { GuideIcon, MapsIcon, HeatmapIcon, PolygonIcon, ChartIcon },
};
</script>
<template>
  <GuideIcon
    v-if="route === '/guide'"
    class="max-h-8 max-w-10"
    :isOpen="isOpen"
  />
  <MapsIcon
    v-if="route === '/risk-map'"
    class="max-h-8 max-w-10"
    :isOpen="isOpen"
  />
  <HeatmapIcon
    v-if="route === '/hazard-map'"
    class="max-h-8 max-w-10"
    :isOpen="isOpen"
  />
  <PolygonIcon
    v-if="route === '/province-statistic'"
    class="max-h-8 max-w-10"
    :isOpen="isOpen"
  />
  <ChartIcon
    v-if="route === '/general-statistic'"
    class="max-h-8 max-w-10"
    :isOpen="isOpen"
  />
</template>
