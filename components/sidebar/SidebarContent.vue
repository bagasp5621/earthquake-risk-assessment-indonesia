<script lang="ts">
import type { SidebarItem } from "../../types/sidebar";

export default {
  data() {
    return {
      sidebarItems: [
        {
          image: "/maps-active.png",
          inactiveImage: "/maps.png",
          title: "Interactive Map",
          route: "/interactive-map",
        },
        {
          image: "/earthquake-active.png",
          inactiveImage: "/earthquake.png",
          title: "Hazard Map",
          route: "/hazard-map",
        },
        {
          image: "/indonesia-active.png",
          inactiveImage: "/indonesia.png",
          title: "Province Statistic",
          route: "/province-statistic",
        },
        {
          image: "/statistic-active.png",
          inactiveImage: "/statistic.png",
          title: "General Statistic",
          route: "/general-statistic",
        },
      ] as SidebarItem[],
    };
  },
};
</script>

<template>
  <div>
    <SidebarItem
      v-for="(item, index) in sidebarItems"
      :key="index"
      :item="item"
    />
  </div>
</template>
