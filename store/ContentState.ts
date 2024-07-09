import { defineStore } from "pinia";

export const useContentStore = defineStore("content", {
  state: () => ({
    content: true,
  }),
  actions: {
    removeContent() {
      this.content = false;
    },
    showContent() {
      this.content = true;
    },
  },
});
