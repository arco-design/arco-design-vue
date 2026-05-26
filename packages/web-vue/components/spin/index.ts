import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Spin from './spin';

const Spin = Object.assign(_Spin, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Spin.name, _Spin);
  },
});

export type SpinInstance = InstanceType<typeof _Spin>;
export type SpinProps = SpinInstance['$props'];

export default Spin;
