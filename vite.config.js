import path from 'node:path';
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	base: "calendar-of-life",
	plugins: [react(), svgr()],
	resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
