import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
// @ts-check
import { fileURLToPath } from 'node:url';

import { docsSidebar } from './src/generated/docs-sidebar';
import { sdDocsLlmsIntegration } from './src/integrations/llms/index.mjs';

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

const demoLazyLoadScript = String.raw`
(function () {
  function initLazyDemos() {
    var blocks = document.querySelectorAll('.demo-block[data-deferred]');
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      var tmpl = block.querySelector('.demo-block__deferred-island');
      var mount = block.querySelector('.demo-block__preview-content');
      if (!tmpl || !mount || tmpl.content.childNodes.length === 0) continue;

      (function (b, t, m) {
        var io = new IntersectionObserver(
          function (entries) {
            for (var j = 0; j < entries.length; j++) {
              if (!entries[j].isIntersecting) continue;
              io.disconnect();
              customElements.whenDefined('astro-island').then(function () {
                m.appendChild(t.content);
                b.removeAttribute('data-deferred');
                b.setAttribute('data-loaded', '');
              });
              return;
            }
          },
          { rootMargin: '300px 0px' },
        );
        io.observe(b);
      })(block, tmpl, mount);
    }
  }

  document.addEventListener('astro:after-swap', initLazyDemos);
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
    sdDocsLlmsIntegration(),
    starlight({
      title: 'SD Design',
      description: 'SD Design 组件文档站。',
      favicon: '/favicon.ico',
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
      components: {
        MarkdownContent: './src/components/starlight/MarkdownContent.astro',
      },
      customCss: ['./src/styles/site.css'],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'manifest',
            href: '/site.webmanifest',
          },
        },
        { tag: 'script', content: themeBridgeScript },
        { tag: 'script', content: demoLazyLoadScript },
      ],
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
