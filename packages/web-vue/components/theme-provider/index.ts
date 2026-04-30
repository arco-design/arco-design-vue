import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _ThemeProvider from '../config-provider/theme-provider.vue';

const ThemeProvider = Object.assign(_ThemeProvider, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _ThemeProvider.name, _ThemeProvider);
  },
});

export type ThemeProviderInstance = InstanceType<typeof _ThemeProvider>;

export default ThemeProvider;
