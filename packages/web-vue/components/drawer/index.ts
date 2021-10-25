import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Drawer from './drawer.vue';

const Drawer = Object.assign(_Drawer, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Drawer.name, _Drawer);
  },
});

export type DrawerInstance = InstanceType<typeof _Drawer>;

export default Drawer;
