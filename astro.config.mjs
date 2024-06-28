import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  proxy: {
    '/': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      
    }
  }
});