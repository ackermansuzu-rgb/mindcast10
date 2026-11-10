
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  // Website title and favicon
  app: {
    head: {
      title: "MindCast",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },

  // CSS files
  css: ["@mdi/font/css/materialdesignicons.css"],

  // Vuetify configuration
  build: {
    transpile: ["vuetify"],
  },

  // Vite configuration
  vite: {
    plugins: [
      // @ts-expect-error
      vuetify({
        autoImport: true,
      }),
    ],

    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
