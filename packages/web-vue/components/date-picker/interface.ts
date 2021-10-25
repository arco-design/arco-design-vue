import { Slot, VNode } from 'vue';
import { Dayjs } from 'dayjs';
import { TimePickerProps } from '../time-picker/interface';

// 支持：Date ｜ 字符串 ｜ 时间戳
export type CalendarValue = Date | string | number;

export interface ShortcutType {
  label: string | number | (() => VNode);
  value:
    | CalendarValue
    | CalendarValue[]
    | (() => CalendarValue | CalendarValue[]);
  format?: string;
}

export interface DisabledTimeProps {
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
}

export type FormatFunc = (current: Date) => string;
export type IsSameTime = (current: Dayjs, target: Dayjs) => boolean;
export type DisabledDate = (current: Date) => boolean;
export type DisabledTime = (current: Date) => DisabledTimeProps;
export type RangeDisabledDate = (
  current: Date,
  type: 'start' | 'end'
) => boolean;
export type RangeDisabledTime = (
  current: Date,
  type: 'start' | 'end'
) => DisabledTimeProps;

export type Mode = 'date' | 'year' | 'quarter' | 'month' | 'week';

export interface DatePickerProps {
  dayStartOfWeek: 0 | 1;
  format?: string | FormatFunc;
  modelValue?: CalendarValue;
  defaultValue?: CalendarValue;
  showTime: boolean;
  timePickerProps?: Partial<TimePickerProps>;
  showNowBtn: boolean;
  disabledTime?: DisabledTime;
}

export interface WeekPickerProps {
  dayStartOfWeek: 0 | 1;
  format?: string;
  modelValue?: CalendarValue;
  defaultValue?: CalendarValue;
}

export interface MonthPickerProps {
  format?: string;
  modelValue?: CalendarValue;
  defaultValue?: CalendarValue;
}

export interface YearPickerProps {
  format?: string;
  modelValue?: CalendarValue;
  defaultValue?: CalendarValue;
}

export interface QuarterPickerProps {
  format?: string;
  modelValue?: CalendarValue;
  defaultValue?: CalendarValue;
}

export interface BasePickerProps {
  locale?: Record<string, any>;
  hideTrigger: boolean;
  allowClear: boolean;
  readonly: boolean;
  error: boolean;
  size: 'mini' | 'small' | 'medium' | 'large';
  shortcuts: ShortcutType[];
  shortcutsPosition: 'left' | 'bottom' | 'right';
  position: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  popupVisible: boolean | undefined;
  defaultPopupVisible: boolean;
  triggerProps?: Record<string, unknown>;
  unmountOnClose: boolean;
}

export type PickerProps = BasePickerProps &
  DatePickerProps & {
    placeholder?: string;
    disabled: boolean;
    disabledDate?: DisabledDate;
    pickerValue?: CalendarValue;
    defaultPickerValue?: CalendarValue;
    mode: Mode;
  };

export interface PickerEvents {
  onVisibleChange?: (visible: boolean) => void;
  onSelectShortcut?: (shortcut: ShortcutType) => void;
  onOk?: (dateString: string, date: Date) => void;
  onClear?: () => void;
  onSelect?: (dateString: string, date: Date) => void;
  onChange?: (dateString: string | undefined, date: Date | undefined) => void;
  onPickerValueChange?: (
    dateString: string | undefined,
    date: Date | undefined
  ) => void;
}

export interface PickerSlots {
  date?: (currentDate: Date) => VNode;
  iconPrev?: () => VNode;
  iconPrevDouble?: () => VNode;
  iconNext?: () => VNode;
  iconNextDouble?: () => VNode;
  iconInputSuffix?: () => VNode;
  extra?: () => VNode;
  default?: () => VNode;
}

export interface RangePickerProps extends BasePickerProps {
  /** 范围选择器的类型 */
  mode: Mode;
  /** 日历组件的值 */
  modelValue?: CalendarValue[];
  /** 默认日期 */
  defaultValue?: CalendarValue[];
  /** 默认面板显示的日期 */
  defaultPickerValue?: CalendarValue[];
  /** 面板显示的日期 */
  pickerValue?: CalendarValue[];
  /** 是否禁用 */
  disabled: boolean | boolean[];
  /** 每周的第一天开始于周几，0 - 周日，1 - 周一。(默认0) */
  dayStartOfWeek: 0 | 1;
  /** 展示日期的格式，参考[字符串解析格式](#字符串解析格式) */
  format?: string;
  /** 是否增加时间选择 */
  showTime: boolean;
  /** 提示文案 */
  placeholder?: string[];
  /** 时间显示的参数，参考 [TimePickerProps](/vue/component/time-picker)。 */
  timePickerProps?: Partial<TimePickerProps>;
  /** 不可选的日期 */
  disabledDate?: RangeDisabledDate;
  /** 不可选取的时间 */
  disabledTime?: RangeDisabledTime;
  separator?: string;
}

export interface RangePickerEvents {
  /** 日历组件值发生改变时的回调 */
  onChange?: (
    dateString: string[] | undefined,
    date: Date[] | undefined
  ) => void;
  /** 选中日期发生改变但组件值未改变时的回调 */
  onSelect?: (
    dateString: (string | undefined)[],
    value: (Date | undefined)[]
  ) => void;
  /** 点击确认按钮的回调 */
  onOk?: (dateString: string[], date: Date[]) => void;
  /** 面板日期改变的回调 */
  onPickerValueChange?: (dateString: string[], value: Date[]) => void;
}

export interface RangePickerSlots {
  separator?: () => VNode;
  default?: () => VNode;
}

export interface Cell {
  value: Dayjs;
  label: string | number;
  isPrev?: boolean;
  isNext?: boolean;
  classNames?:
    | string
    | {
        [x: string]: boolean;
      };
}

export interface HeaderOperations {
  onSuperPrev?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onSuperNext?: () => void;
}

export interface HeaderIcons {
  prev?: Slot;
  prevDouble?: Slot;
  next?: Slot;
  nextDouble?: Slot;
}
