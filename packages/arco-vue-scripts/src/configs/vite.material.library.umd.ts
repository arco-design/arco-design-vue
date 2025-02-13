import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import { terser } from 'rollup-plugin-terser';

export default ({ name }: { name: string }): InlineConfig => {
  return {
    mode: 'production',
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: true,
      minify: false,
      brotliSize: false,
      rollupOptions: {
        external: [
          'vue',
          '@arco-design/web-vue',
          '@arco-design/web-vue/es/icon',
        ],
        output: [
          {
            format: 'umd',
            entryFileNames: `index.js`,
            sourcemap: true,
            globals: {
              'vue': 'Vue',
              '@arco-design/web-vue': 'ArcoVue',
              '@arco-design/web-vue/es/icon': 'ArcoVueIcon',
            },
          },
          {
            format: 'umd',
            entryFileNames: `index.min.js`,
            sourcemap: true,
            globals: {
              'vue': 'Vue',
              '@arco-design/web-vue': 'ArcoVue',
              '@arco-design/web-vue/es/icon': 'ArcoVueIcon',
            },
            // @ts-ignore
            plugins: [terser()],
          },
        ],
      },
      // 开启lib模式
      lib: {
        entry: 'components/components.ts',
        formats: ['umd'],
        name,
      },
    },
    // @ts-ignore vite内部类型错误
    plugins: [vue(), vueJsx(), svgLoader()],
  };
};
