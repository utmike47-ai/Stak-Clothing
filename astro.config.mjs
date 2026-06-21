import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.stakclothing.com',
  compressHTML: true,
  integrations: [sitemap()],
  redirects: {
    '/journal': '/field-notes',
    '/journal/[slug]': '/field-notes/[slug]',
  },
});
