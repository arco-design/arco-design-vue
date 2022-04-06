import { App, reactive, Slots } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _ConfigProvider from './config-provider.vue';
import { configProviderInjectionKey } from './context';
import { ArcoLang } from '../locale/interface';
import { Size } from '../_utils/constant';

const ConfigProvider = Object.assign(_ConfigProvider, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _ConfigProvider.name, _ConfigProvider);

    // 全局注入
    app.provide(
      configProviderInjectionKey,
      reactive({
        slots: null as unknown as Slots,
        prefixCls: 'arco',
        locale: null as unknown as ArcoLang,
        size: 'medium' as Size,
      })
    );
  },
});

export type ConfigProviderInstance = InstanceType<typeof _ConfigProvider>;

export default ConfigProvider;
