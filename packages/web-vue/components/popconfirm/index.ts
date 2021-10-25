import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Popconfirm from './popconfirm.vue';

const Popconfirm = Object.assign(_Popconfirm, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Popconfirm.name, _Popconfirm);
  },
});

export type PopconfirmInstance = InstanceType<typeof _Popconfirm>;

export default Popconfirm;
