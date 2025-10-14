import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      "/api": {
        target: "http://nginx:80",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Proxy response:', proxyRes.statusCode);
            // Add CORS headers
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, Accept, Origin';
          });
        },
      },
    },
  },
  define: {
    "import.meta.env.VITE_COMPANY_NAME": JSON.stringify(process.env.VITE_COMPANY_NAME || ""),
    "import.meta.env.VITE_COMPANY_TAGLINE": JSON.stringify(process.env.VITE_COMPANY_TAGLINE || ""),
    "import.meta.env.VITE_COMPANY_LOGO_URL": JSON.stringify(process.env.VITE_COMPANY_LOGO_URL || ""),
  },
});
