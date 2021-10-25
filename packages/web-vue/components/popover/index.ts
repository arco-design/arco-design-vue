import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Popover from './popover.vue';

const Popover = Object.assign(_Popover, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Popover.name, _Popover);
  },
});

export type PopoverInstance = InstanceType<typeof _Popover>;

export default Popover;
