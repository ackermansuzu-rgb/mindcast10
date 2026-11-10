import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: { mdi },
    },
    theme: {
      defaultTheme: "emeraldDark",
      themes: {
        emeraldDark: {
          dark: true,
          colors: {
            background: "#061310",
            surface: "#0D211B",
            primary: "#00D6A0",
            secondary: "#087F5B",
            accent: "#34E6B5",
            error: "#FF5252",
            info: "#29B6F6",
            success: "#00C853",
            warning: "#FFC107",
            "on-background": "#F5FFF9",
            "on-surface": "#F5FFF9",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});