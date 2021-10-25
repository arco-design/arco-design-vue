import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _BackTop from './back-top.vue';

const BackTop = Object.assign(_BackTop, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _BackTop.name, _BackTop);
  },
});

export type BackTopInstance = InstanceType<typeof _BackTop>;

export default BackTop;
