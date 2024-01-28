import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

router.afterEach((to) => {
  document.title = `${
    to.meta.title || "ERAI"
  } | Earthquake Risk Assessment Indonesia`;
});
