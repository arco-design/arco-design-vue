import { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _ResizeBox from './resize-box.vue';

const ResizeBox = Object.assign(_ResizeBox, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _ResizeBox.name, _ResizeBox);
  },
});

export type ResizeBoxInstance = InstanceType<typeof _ResizeBox>;

export default ResizeBox;
