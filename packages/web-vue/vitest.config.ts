import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDocs from '@arco-design/vite-plugin-arco-vue-docs';

export default defineConfig({
  plugins: [vueDocs(), vue(), vueJsx()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./scripts/setup-snapshot.ts'],
    testTimeout: 20000,
    hookTimeout: 20000,
    include: ['components/**/__test__/**/*.{test,spec}.{js,ts,tsx}'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '.coverage',
      include: ['components/**/*.{vue,tsx,ts}'],
      exclude: ['components/icon/**/*', '**/style/*'],
    },
  },
});
