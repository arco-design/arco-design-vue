import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Tooltip from './tooltip.vue';

const Tooltip = Object.assign(_Tooltip, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Tooltip.name, _Tooltip);
  },
});

export type TooltipInstance = InstanceType<typeof _Tooltip>;

export default Tooltip;
