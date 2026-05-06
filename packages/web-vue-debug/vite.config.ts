import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { defineConfig } from 'vite';

import { createSassStyleSupport } from '../web-vue/scripts/utils/sass-support.mts';

const webVueComponentsRoot = resolve(__dirname, '../web-vue/components');
const webVueStyleRoot = resolve(webVueComponentsRoot, 'style');
const projectRoot = resolve(__dirname, '..');
const webVueIndexScssPath = resolve(webVueComponentsRoot, 'index.scss');
const virtualStyleId = 'virtual:web-vue-source-styles.css';
const resolvedVirtualStyleId = `\0${virtualStyleId}`;

const { styleAliasEntries, compileStyleEntry } = createSassStyleSupport({
  packageRoot: projectRoot,
  componentsRoot: webVueComponentsRoot,
  styleRoot: webVueStyleRoot,
});

function createWebVueSourceStylePlugin() {
  return {
    name: 'web-vue-source-style',
    resolveId(id: string) {
      if (id === virtualStyleId) {
        return resolvedVirtualStyleId;
      }

      return null;
    },
    async load(id: string) {
      if (id !== resolvedVirtualStyleId) {
        return null;
      }

      return compileStyleEntry(webVueIndexScssPath, 'index.scss');
    },
    handleHotUpdate(context: { file: string; server: any }) {
      if (
        !context.file.startsWith(webVueComponentsRoot) ||
        !/\.(?:scss|sass|css)$/i.test(context.file)
      ) {
        return;
      }

      const module = context.server.moduleGraph.getModuleById(resolvedVirtualStyleId);

      if (!module) {
        return;
      }

      context.server.moduleGraph.invalidateModule(module);
      return [module];
    },
  };
}

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /packages\/web-vue\/components\/.*\.vue$/],
    }),
    vueJsx({
      include: [/\.[jt]sx$/, /packages\/web-vue\/components\/.*\.[jt]sx$/],
    }),
    createWebVueSourceStylePlugin(),
  ],
  resolve: {
    alias: [
      {
        find: '@sdata/web-vue',
        replacement: resolve(webVueComponentsRoot, 'index.ts'),
      },
      {
        find: '@sdata/web-vue/es/icon',
        replacement: resolve(webVueComponentsRoot, 'icon/index.ts'),
      },
      {
        find: '@web-vue-src',
        replacement: webVueComponentsRoot,
      },
      ...styleAliasEntries,
    ],
  },
  server: {
    fs: {
      allow: [projectRoot],
    },
  },
});
