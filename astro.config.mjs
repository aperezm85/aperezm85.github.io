import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://aperezm85.github.io',
  integrations: [tailwind(), svelte(), react()],
  output: 'server'
});