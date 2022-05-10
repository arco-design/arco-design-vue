import stackblitz from '@stackblitz/sdk';
import { mainContent, styleContent } from './code-template';

export const htmlContent = `
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
`;

export const stackblitzRc = `
  {
    "installDependencies": false,
    "startCommand": "turbo && turbo dev"
  }
`;

export const viteConfigContent = `
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue';
  import vueJsx from '@vitejs/plugin-vue-jsx';
  export default defineConfig({
    plugins: [vue(), vueJsx()],
  });
`;

export const packageJSONContent = JSON.stringify(
  {
    name: 'arco-vue-demo',
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      serve: 'vite preview',
    },
    dependencies: {
      'vue': '^3.2.0',
      'dayjs': '^1.0',
      '@arco-design/web-vue': 'latest',
    },
    devDependencies: {
      'vite': '^2.9.8',
      '@vitejs/plugin-vue': '^2.3.2',
      '@vitejs/plugin-vue-jsx': '^1.3.10',
    },
  },
  null,
  2
);

export const openStackblitz = (content: string) => {
  stackblitz.openProject(
    {
      title: `arco-design-demo`,
      description: 'arco-design-demo',
      template: 'node',
      files: {
        'src/App.vue': content,
        'src/style.css': styleContent,
        'src/main.js': mainContent,
        'index.html': htmlContent,
        'package.json': packageJSONContent,
        'vite.config.js': viteConfigContent,
        '.stackblitzrc': stackblitzRc,
      },
    },
    {
      openFile: 'src/App.vue',
    }
  );
};
