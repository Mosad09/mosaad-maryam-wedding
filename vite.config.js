import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set base to your repo name for GitHub Pages, e.g. "/mosaad-maryam-wedding/"
// If deploying to a custom domain or user/org page (username.github.io), use "/"
export default defineConfig({
  plugins: [react()],
  base: "/mosaad-maryam-weeding/",
  build: {
    outDir: "dist",
  },
});
