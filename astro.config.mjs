// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    server: {
      host: '127.0.0.1',
      port: 4321,
      allowedHosts: true,
    },
  },
});