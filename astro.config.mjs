// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ptable.top',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en-US',
        zh: 'zh-CN',
      },
    },
  })],
  outDir: 'docs',
  build: {
    format: 'directory',
  },
});