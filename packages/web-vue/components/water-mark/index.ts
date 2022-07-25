import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _WaterMark from './water-mark.vue';

const WaterMark = Object.assign(_WaterMark, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _WaterMark.name, _WaterMark);
  },
});

export type WaterMarkInstance = InstanceType<typeof _WaterMark>;

export default WaterMark;
