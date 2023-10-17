import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/(.*)": {
        target: "https://square-cloud-manager.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    headers: {
      source: "/(.*)",
      headers: [
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        {
          key: "Cross-Origin-Opener-Policy",
          value: " same-origin-allow-popups",
        },
      ],
    },
  },
});
