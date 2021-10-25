import { Dayjs } from 'dayjs';

// 支持：Date ｜ 字符串 ｜ 时间戳
export type TimeValue = Date | string | number;

export interface BasePanelProps {
  disableConfirm: boolean;
  use12Hours: boolean;
  step?: { hour?: number; minute?: number; second?: number };
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour?: number) => number[];
  disabledSeconds?: (
    selectedHour?: number,
    selectedMinute?: number
  ) => number[];
  hideDisabledOptions: boolean;
}

export interface PanelProps extends Omit<BasePanelProps, 'disableConfirm'> {
  value?: Dayjs;
  defaultValue?: Dayjs;
  format: string;
  visible: boolean;
  hideFooter: boolean;
  isRange: boolean;
  disabled: boolean;
}

export interface RangePanelProps extends Omit<PanelProps, 'value'> {
  value?: Array<Dayjs | undefined>;
}

export interface TimePickerProps extends BasePanelProps {
  type: 'time' | 'time-range';
  modelValue?: TimeValue | TimeValue[];
  defaultValue?: TimeValue | TimeValue[];
  placeholder?: string | string[];
  disabled: boolean;
  allowClear: boolean;
  readonly: boolean;
  error: boolean;
  format?: string;
  size: 'mini' | 'small' | 'medium' | 'large';
  position: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  popupVisible: boolean | undefined;
  defaultPopupVisible: boolean;
  triggerProps?: Record<string, unknown>;
  unmountOnClose: boolean;
}

export interface TimeListItem {
  value: number | string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

export type TimeList = TimeListItem[];
