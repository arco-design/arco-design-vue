import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _ConfigProvider from './config-provider.vue';

const ConfigProvider = Object.assign(_ConfigProvider, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _ConfigProvider.name, _ConfigProvider);
  },
});

export type ConfigProviderInstance = InstanceType<typeof _ConfigProvider>;
export type {
  SDThemeConfig,
  SDThemeMeta,
  SDThemeMode,
  ThemeTokenMap,
  ThemeTokenValue,
} from './theme';
export type { JsonFormProviderConfig as ConfigProviderJsonFormConfig } from '../json-form';

export default ConfigProvider;
