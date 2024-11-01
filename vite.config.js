import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://chat-api-production-2c0b.up.railway.app/",
        changeOrigin: true,
        secure: false, // For development only
      },
    },
  },
});
