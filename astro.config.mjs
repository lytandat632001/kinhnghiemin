import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kinhnghiemin.pages.dev',
  integrations: [sitemap()],
});