import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Trigger from './trigger';

const Trigger = Object.assign(_Trigger, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Trigger.name, _Trigger);
  },
});

export type TriggerInstance = InstanceType<typeof _Trigger>;
export type { TriggerEvent, TriggerPosition } from '../_utils/constant';
export type { TriggerProps, TriggerPopupTranslate } from './interface';

export default Trigger;
