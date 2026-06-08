import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Calendar from './components/index.vue';

const Calendar = Object.assign(_Calendar, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Calendar.name, _Calendar);
  },
});

export type CalendarInstance = InstanceType<typeof _Calendar>;

export default Calendar;
