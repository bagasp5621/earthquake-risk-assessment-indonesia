import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", {
  state: () => ({
    latitude: 0,
    longitude: 0,
  }),
});
