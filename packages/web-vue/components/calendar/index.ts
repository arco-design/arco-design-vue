import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Calendar from './calendar';

const Calendar = Object.assign(_Calendar, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Calendar.name, _Calendar);
  },
});

export type CalendarInstance = InstanceType<typeof _Calendar>;

export default Calendar;
