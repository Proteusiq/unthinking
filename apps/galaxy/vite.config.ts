import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Relative base paths so the built dist/ works:
//   - opened directly from the filesystem (file://)
//   - hosted on GitHub Pages under a subpath
//   - served by any static host at a root or sub path
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    // Split out the big chunks so first paint isn't blocked by a single
    // 2 MB bundle. Three.js + post-processing + UMAP are independent of
    // the React app and can stream in parallel.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          "react-three": [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
          umap: ["umap-js"],
        },
      },
    },
  },
});
