import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/tests/setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@styles": path.resolve(__dirname, "./src/styles/"),
      "@types": path.resolve(__dirname, "./src/types/"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
