import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Divider from './divider';

const Divider = Object.assign(_Divider, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Divider.name, _Divider);
  },
});

export type DividerInstance = InstanceType<typeof _Divider>;

export default Divider;
