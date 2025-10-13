import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://nginx",
        changeOrigin: true,
      },
    },
  },
  define: {
    "import.meta.env.VITE_COMPANY_NAME": JSON.stringify(process.env.VITE_COMPANY_NAME || ""),
    "import.meta.env.VITE_COMPANY_TAGLINE": JSON.stringify(process.env.VITE_COMPANY_TAGLINE || ""),
    "import.meta.env.VITE_COMPANY_LOGO_URL": JSON.stringify(process.env.VITE_COMPANY_LOGO_URL || ""),
  },
});
