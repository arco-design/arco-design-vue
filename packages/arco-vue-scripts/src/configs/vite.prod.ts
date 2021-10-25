import { InlineConfig } from 'vite';
import glob from 'glob';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import external from '../plugins/vite-plugin-external';
import buildVirtual from '../plugins/vite-plugin-build-virtual';

const langFiles = glob.sync('components/locale/lang/*.ts');

const config: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    outDir: 'es',
    emptyOutDir: false,
    minify: false,
    brotliSize: false,
    rollupOptions: {
      input: ['components/index.ts', 'components/icon/index.ts', ...langFiles],
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
        {
          format: 'commonjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
      ],
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      entry: 'components/index.ts',
      formats: ['es', 'cjs'],
    },
  },
  // @ts-ignore vite内部类型错误
  plugins: [external(), vue(), vueJsx(), buildVirtual()],
};

export default config;
