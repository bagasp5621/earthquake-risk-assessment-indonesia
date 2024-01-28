import { createRouter, createWebHistory } from "vue-router";
import Sidebar from "./features/sidebar/Sidebar.vue";
import Content from "./features/content/Content.vue";

const routes = [
  {
    path: "/",
    redirect: "/content",
  },
  {
    path: "/sidebar",
    name: "Sidebar",
    component: Sidebar,
    meta: { title: "Sidebar" },
  },
  {
    path: "/content",
    name: "Content",
    component: Content,
    meta: { title: "Content" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
