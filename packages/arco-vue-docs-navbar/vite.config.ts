import { defineConfig } from 'vite';
import svgr from './plugins/rollup-plugin-svgr';

export default defineConfig({
  mode: 'development',
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          prefix: 'arco-react',
        },
      },
    },
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [svgr()],
});
