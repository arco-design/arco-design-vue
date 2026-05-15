import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _TimePicker from './time-picker.vue';

const TimePicker = Object.assign(_TimePicker, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _TimePicker.name, _TimePicker);
  },
});

export type TimePickerInstance = InstanceType<typeof _TimePicker>;
export type { TimeValue } from './interface';

export default TimePicker;
