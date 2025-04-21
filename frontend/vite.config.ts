import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@styles": path.resolve(__dirname, "./src/styles/"),
      "@types": path.resolve(__dirname, "./src/types/"),
    },
  },
  plugins: [react()],
});
