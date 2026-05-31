import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./preview",
  base: "/antd-number-input/",
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: "../demo-dist",
  },
});