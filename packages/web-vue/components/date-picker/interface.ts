import { Slot, VNode } from 'vue';
import { Dayjs } from 'dayjs';
import { TimePickerProps } from '../time-picker/interface';

export type CalendarValue = Date | string | number;
export type ValueFormat = 'timestamp' | 'Date' | string;

export interface ShortcutType {
  /**
   * @zh 选项的内容
   * @en the content of shortcut
   */
  label: string | number | (() => VNode);
  /**
   * @zh 选项值
   * @en the value of shortcut
   */
  value:
    | (Date | string | number)
    | (Date | string | number)[]
    | (() => (Date | string | number) | (Date | string | number)[]);
  /**
   * @zh 解析值所使用的格式，参考[字符串解析格式](#字符串解析格式)
   * @en the format use to parse value, refer to [String Parsing Format](#string-parsing-format)
   */
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

export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DatePickerProps {
  dayStartOfWeek: WeekStart;
  format?: string | FormatFunc;
  modelValue?: CalendarValue;
  defaultValue?: CalendarValue;
  showTime: boolean;
  timePickerProps?: Partial<TimePickerProps>;
  showNowBtn: boolean;
  disabledTime?: DisabledTime;
}

export interface WeekPickerProps {
  dayStartOfWeek: WeekStart;
  format?: string;
  modelValue?: CalendarValue;
  defaultValue?: CalendarValue;
}

export interface MonthPickerProps {
  format?: string;
  modelValue?: CalendarValue;
  defaultValue?: CalendarValue;
  abbreviation?: boolean;
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
  valueFormat?: ValueFormat;
  previewShortcut: boolean;
  showConfirm?: boolean;
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

export interface RangePickerProps extends BasePickerProps {
  mode: Mode;
  modelValue?: CalendarValue[];
  defaultValue?: CalendarValue[];
  defaultPickerValue?: CalendarValue[];
  pickerValue?: CalendarValue[];
  disabled: boolean | boolean[];
  dayStartOfWeek: WeekStart;
  format?: string;
  showTime: boolean;
  placeholder?: string[];
  timePickerProps?: Partial<TimePickerProps>;
  disabledDate?: RangeDisabledDate;
  disabledTime?: RangeDisabledTime;
  separator?: string;
  exchangeTime: boolean;
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

export interface StartHeaderProps {
  headerValue: Dayjs;
  headerOperations: Pick<any, string>;
  headerIcons: {
    prev: Slot | undefined;
    prevDouble: Slot | undefined;
    next: Slot | undefined;
    nextDouble: Slot | undefined;
  };
}
