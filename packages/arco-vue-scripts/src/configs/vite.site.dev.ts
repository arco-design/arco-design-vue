import path from 'path';
import { defineConfig, InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDocs from '@arco-design/vite-plugin-arco-vue-docs';
import svgLoader from 'vite-svg-loader';
import eslint from 'vite-plugin-eslint';
import paths from '../utils/paths';

const root = process.cwd();

export default defineConfig({
  mode: 'development',
  server: {
    open: true,
    host: '0.0.0.0',
    port: 2233,
    fs: {
      strict: true,
      allow: ['..'],
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        paths: [paths.resolvePath('../web-vue')],
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^@web-vue\/(.*)/,
        replacement: path.resolve(root, '../web-vue/$1'),
      },
    ],
  },
  plugins: [
    vueDocs(),
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    eslint({
      // hmr情况下cache存在问题
      cache: false,
      include: ['**/*.ts', '**/*.tsx', '**/*.vue'],
      exclude: ['node_modules', '**/components/icon/**/*'],
    }),
  ],
}) as InlineConfig;
