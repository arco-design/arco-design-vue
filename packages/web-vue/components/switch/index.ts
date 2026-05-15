import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Switch from './switch.vue';

export type SwitchValue = boolean | string | number;
export type SwitchBeforeChange = (
  newValue: SwitchValue,
) => Promise<boolean | void> | boolean | void;
export type SwitchChangeHandler = (value: SwitchValue, event: Event) => void;

const Switch = Object.assign(_Switch, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Switch.name, _Switch);
  },
});

export type SwitchInstance = InstanceType<typeof _Switch>;

export default Switch;
