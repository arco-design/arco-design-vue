import { InlineConfig } from 'vite';

const config: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    outDir: 'dist/css',
    emptyOutDir: false,
    minify: false,
    brotliSize: false,
    rollupOptions: {
      external: /less$/,
      output: [
        {
          format: 'es',
          dir: 'dist/css',
          entryFileNames: '[name].js',
        },
      ],
    },
    lib: {
      entry: 'src/style/index.ts',
      formats: ['es'],
    },
  },
};

export default config;
