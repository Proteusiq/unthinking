import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Relative base paths so the built dist/ works:
//   - opened directly from the filesystem (file://)
//   - hosted on Render as a root site
//   - hosted on GitHub Pages under a subpath
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
