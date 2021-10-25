import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Switch from './switch.vue';

const Switch = Object.assign(_Switch, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Switch.name, _Switch);
  },
});

export type SwitchInstance = InstanceType<typeof _Switch>;

export default Switch;
