declare module '@sdata/web-vue' {
  import type { Plugin } from 'vue';

  export type ThemeTokenValue = string | number;
  export type ThemeTokenMap = Record<string, ThemeTokenValue>;

  export interface SDThemeMeta {
    name?: string;
    schemaVersion?: number;
    cssVarPrefix?: string;
  }

  export type SDThemeMode = 'light' | 'dark';

  export interface SDThemeConfig {
    tokens?: ThemeTokenMap;
    components?: Record<string, ThemeTokenMap>;
    meta?: SDThemeMeta;
    token?: ThemeTokenMap;
    component?: Record<string, ThemeTokenMap>;
    [key: string]: unknown;
  }

  const SDVue: Plugin;
  export default SDVue;
}

declare module '@sdata/web-vue/es/icon' {
  import type { Plugin } from 'vue';

  const SDVueIcon: Plugin;
  export default SDVueIcon;
}

declare module '@sdata/web-vue/es/icon.js' {
  import type { Plugin } from 'vue';

  const SDVueIcon: Plugin;
  export default SDVueIcon;
}
