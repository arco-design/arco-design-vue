import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Watermark from './watermark';

const Watermark = Object.assign(_Watermark, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Watermark.name, _Watermark);
  },
});

export type WatermarkInstance = InstanceType<typeof _Watermark>;

export default Watermark;
