import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Cascader from './cascader.vue';

const Cascader = Object.assign(_Cascader, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Cascader.name, _Cascader);
  },
});

export type CascaderInstance = InstanceType<typeof _Cascader>;

export default Cascader;
