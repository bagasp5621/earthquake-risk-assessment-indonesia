import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", {
  state: () => ({
    latitude: 0,
    longitude: 0,
  }),
});

// export const usePopupStore = defineStore({
//   id: "popup",
//   state: () => ({
//     latitude: 0,
//     longitude: 0,
//   }),
// });
