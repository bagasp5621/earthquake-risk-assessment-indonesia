<script lang="ts">
import type { SidebarItem } from "../../types/sidebar";

export default {
  data() {
    return {
      sidebarItems: [
        {
          title: "Guide",
          route: "/guide",
        },
        {
          title: "Risk Map",
          route: "/risk-map",
        },
        {
          title: "Hazard Map",
          route: "/hazard-map",
        },
        {
          title: "Province Statistic",
          route: "/province-statistic",
        },
        {
          title: "General Statistic",
          route: "/general-statistic",
        },
      ] as SidebarItem[],
    };
  },
};
</script>

<template>
  <div class="flex justify-between md:justify-normal m-4 md:m-0 md:flex-col">
    <SidebarItem
      v-for="(item, index) in sidebarItems"
      :key="index"
      :item="item"
    />
  </div>
</template>
