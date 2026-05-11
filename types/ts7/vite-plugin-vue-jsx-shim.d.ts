declare module '@vitejs/plugin-vue-jsx' {
  import type { PluginOption } from 'vite';

  interface VueJsxPluginOptions {
    include?: unknown;
    exclude?: unknown;
    [key: string]: unknown;
  }

  export default function vueJsx(options?: VueJsxPluginOptions): PluginOption;
}
