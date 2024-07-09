import { defineStore } from "pinia";
import type { EarthquakeData } from "~/types/Earthquake";

export const useHazardStore = defineStore("hazard", {
  state: () => ({
    hazard: undefined as EarthquakeData | undefined,
  }),
  actions: {
    insertHazard(earthquake: EarthquakeData) {
      this.hazard = earthquake;
    },
    removeHazard() {
      this.hazard = undefined;
    },
  },
});
