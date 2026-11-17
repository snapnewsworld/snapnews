// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { glossaryPlugin } from './src/plugins/glossary.mjs';

const base = '/snapnews';

// GitHub Pages project site: https://snapnewsworld.github.io/snapnews/
// If you add a custom domain later, set `site` to it and `base` to ''.
export default defineConfig({
  site: 'https://snapnewsworld.github.io',
  base,
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      hastPlugins: [glossaryPlugin({ file: './src/content/glossary.yaml', pageUrl: `${base}/explained/glossary/` })],
    }),
  },
  vite: {
    build: {
      // Keep scripts as separate files so the Content-Security-Policy can forbid inline scripts.
      assetsInlineLimit: 0,
    },
  },
});
