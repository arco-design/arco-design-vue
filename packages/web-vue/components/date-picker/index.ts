import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';
import type { CalendarValue } from './interface';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _DatePicker from './pickers/date-picker';
import _MonthPicker from './pickers/month-picker';
import _QuarterPicker from './pickers/quarter-picker';
import _WeekPicker from './pickers/week-picker';
import _YearPicker from './pickers/year-picker';
import _RangePicker from './range-picker.vue';

export type {
  CalendarValue,
  DatePickerProps,
  DisabledDate,
  DisabledTime,
  DisabledTimeProps,
  FormatFunc,
  MonthPickerProps,
  PickerProps,
  QuarterPickerProps,
  RangeDisabledDate,
  RangeDisabledTime,
  RangePickerProps,
  ShortcutType,
  ValueFormat,
  WeekPickerProps,
  YearPickerProps,
} from './interface';

export type DatePickerChangeHandler = (
  value: CalendarValue | undefined,
  date: Date | undefined,
  dateString: string | undefined,
) => void;
export type DatePickerSelectHandler = DatePickerChangeHandler;
export type DatePickerOkHandler = DatePickerChangeHandler;
export type RangePickerChangeHandler = (
  value: (CalendarValue | undefined)[] | undefined,
  date: (Date | undefined)[] | undefined,
  dateString: (string | undefined)[] | undefined,
) => void;
export type RangePickerSelectHandler = (
  value: (CalendarValue | undefined)[],
  date: (Date | undefined)[],
  dateString: (string | undefined)[],
) => void;
export type RangePickerOkHandler = (
  value: CalendarValue[],
  date: Date[],
  dateString: string[],
) => void;

const DatePicker = Object.assign(_DatePicker, {
  WeekPicker: _WeekPicker,
  MonthPicker: _MonthPicker,
  YearPicker: _YearPicker,
  QuarterPicker: _QuarterPicker,
  RangePicker: _RangePicker,
  install: (app: App, options?: SDOptions) => {
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
