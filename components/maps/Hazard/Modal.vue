<script lang="ts">
import type { PropType } from "vue";

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

export default {
  props: {
    cluster: {
      type: Object as PropType<Earthquake>,
    },
  },
};
</script>
<template>
  <div class="bg-[#1D1F25]">{{ cluster }}</div>
</template>
