import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://caterlord.com',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  i18n: {
    // English lives at the site root (matches the current site).
    // zh-hant / zh-hans / ms are prefixed, e.g. /zh-hant/...
    defaultLocale: 'en',
    locales: ['en', 'zh-hant', 'zh-hans', 'ms'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
