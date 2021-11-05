import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Spin from './spin';

const Spin = Object.assign(_Spin, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Spin.name, _Spin);
  },
});

export type SpinInstance = InstanceType<typeof _Spin>;

export default Spin;
