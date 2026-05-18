import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
// @ts-check
import { fileURLToPath } from 'node:url';

import { docsSidebar } from './src/generated/docs-sidebar';

const themeBridgeScript = String.raw`
(() => {
  const applyTheme = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';

    if (isDark) {
      document.body.setAttribute('sd-theme', 'dark');
      return;
    }

    document.body.removeAttribute('sd-theme');
  };

  const start = () => {
    applyTheme();

    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
    return;
  }

  start();
})();
`;

export default defineConfig({
  site: 'https://sd-design.js.org/',
  vite: {
    resolve: {
      noExternal: ['@vue/repl'],
      alias: [
        {
          find: /^@sdata\/web-vue$/,
          replacement: fileURLToPath(new URL('../web-vue/es/index.js', import.meta.url)),
        },
        {
          find: /^@style\/(.*)$/,
          replacement: `${fileURLToPath(new URL('../web-vue/components/style/', import.meta.url))}$1`,
        },
        {
          find: /^@components\/(.*)$/,
          replacement: `${fileURLToPath(new URL('../web-vue/components/', import.meta.url))}$1`,
        },
        {
          find: /^@sdata\/web-vue\/es\/icon$/,
          replacement: fileURLToPath(new URL('../web-vue/es/icon.js', import.meta.url)),
        },
        {
          find: /^@sdata\/web-vue\/es\/icon\.js$/,
          replacement: fileURLToPath(new URL('../web-vue/es/icon.js', import.meta.url)),
        },
      ],
    },
    optimizeDeps: {
      exclude: ['@vue/repl'],
    },
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'SD Design',
      description: 'SD Design 组件文档站。',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/liunnn1994/sd-design',
        },
      ],
      sidebar: docsSidebar,
      customCss: ['./src/styles/site.css'],
      head: [{ tag: 'script', content: themeBridgeScript }],
      disable404Route: true,
      lastUpdated: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      pagination: true,
      credits: false,
    }),
    mdx(),
    vue({ appEntrypoint: '/src/pages/_app.ts' }),
  ],
});
