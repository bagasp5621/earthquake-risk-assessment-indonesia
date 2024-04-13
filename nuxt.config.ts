export default defineNuxtConfig({
  app: {
    head: {
      title: "Eq. Risk Assessment",
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap",
        },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt3-leaflet",
    "@hebilicious/vue-query-nuxt",
  ],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 6,
    },
    config: {},
    viewer: true,
  },
  vueQuery: {
    stateKey: "vue-query-nuxt",
    queryClientOptions: {
      defaultOptions: { queries: { staleTime: 5000 } }, // default
    },
  },
});
