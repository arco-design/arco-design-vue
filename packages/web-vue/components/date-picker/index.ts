import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _DatePicker from './pickers/date-picker';
import _WeekPicker from './pickers/week-picker';
import _MonthPicker from './pickers/month-picker';
import _YearPicker from './pickers/year-picker';
import _QuarterPicker from './pickers/quarter-picker';
import _RangePicker from './range-picker.vue';

export type { ShortcutType } from './interface';

const DatePicker = Object.assign(_DatePicker, {
  WeekPicker: _WeekPicker,
  MonthPicker: _MonthPicker,
  YearPicker: _YearPicker,
  QuarterPicker: _QuarterPicker,
  RangePicker: _RangePicker,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _DatePicker.name, _DatePicker);
    app.component(componentPrefix + _YearPicker.name, _YearPicker);
    app.component(componentPrefix + _QuarterPicker.name, _QuarterPicker);
    app.component(componentPrefix + _MonthPicker.name, _MonthPicker);
    app.component(componentPrefix + _WeekPicker.name, _WeekPicker);
    app.component(componentPrefix + _RangePicker.name, _RangePicker);
  },
});

export type DatePickerInstance = InstanceType<typeof _DatePicker>;
export type WeekPickerInstance = InstanceType<typeof _WeekPicker>;
export type MonthPickerInstance = InstanceType<typeof _MonthPicker>;
export type YearPickerInstance = InstanceType<typeof _YearPicker>;
export type QuarterPickerInstance = InstanceType<typeof _QuarterPicker>;
export type RangePickerInstance = InstanceType<typeof _RangePicker>;

export {
  _WeekPicker as WeekPicker,
  _MonthPicker as MonthPicker,
  _YearPicker as YearPicker,
  _QuarterPicker as QuarterPicker,
  _RangePicker as RangePicker,
};

export default DatePicker;
