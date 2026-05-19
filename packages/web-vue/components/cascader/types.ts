import type { VirtualListProps } from '../_components/virtual-list/interface';
import type { Size } from '../_utils/constant';
import type { TriggerProps } from '../trigger';
import type {
  CascaderFallback,
  CascaderFieldNames,
  CascaderFormatLabel,
  CascaderLoadMore,
  CascaderModelValue,
  CascaderOption,
} from './interface';

export type CascaderExpandTrigger = 'click' | 'hover';

export interface CascaderProps {
  pathMode?: boolean;
  multiple?: boolean;
  modelValue?: CascaderModelValue;
  value?: CascaderModelValue;
  defaultValue?: CascaderModelValue;
  options?: CascaderOption[];
  disabled?: boolean;
  error?: boolean;
  size?: Size;
  allowSearch?: boolean;
  filterable?: boolean;
  allowClear?: boolean;
  clearable?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  popupVisible?: boolean;
  show?: boolean;
  expandTrigger?: CascaderExpandTrigger;
  defaultPopupVisible?: boolean;
  defaultShow?: boolean;
  placeholder?: string;
  filterOption?: (inputValue: string, option: CascaderOption) => boolean;
  popupContainer?: string | HTMLElement;
  maxTagCount?: number | 'responsive';
  showPath?: boolean;
  separator?: string;
  formatLabel?: CascaderFormatLabel;
  triggerProps?: TriggerProps;
  checkStrictly?: boolean;
  loadMore?: CascaderLoadMore;
  loading?: boolean;
  searchOptionOnlyLabel?: boolean;
  searchDelay?: number;
  fieldNames?: CascaderFieldNames;
  valueKey?: string;
  fallback?: boolean | CascaderFallback;
  expandChild?: boolean;
  virtualListProps?: VirtualListProps;
  tagNowrap?: boolean;
}

export type CascaderEmits = {
  'update:modelValue': [value: CascaderModelValue];
  'update:value': [value: CascaderModelValue];
  'update:popupVisible': [visible: boolean];
  'update:show': [visible: boolean];
  'change': [value: CascaderModelValue];
  'inputValueChange': [value: string];
  'clear': [];
  'search': [value: string];
  'popupVisibleChange': [visible: boolean];
  'showChange': [visible: boolean];
  'focus': [ev: FocusEvent];
  'blur': [ev: FocusEvent];
};

export interface CascaderPanelProps {
  pathMode?: boolean;
  multiple?: boolean;
  modelValue?: CascaderModelValue;
  value?: CascaderModelValue;
  defaultValue?: CascaderModelValue;
  options?: CascaderOption[];
  expandTrigger?: CascaderExpandTrigger;
  checkStrictly?: boolean;
  loadMore?: CascaderLoadMore;
  fieldNames?: CascaderFieldNames;
  valueKey?: string;
  expandChild?: boolean;
}

export type CascaderPanelEmits = {
  'update:modelValue': [value: CascaderModelValue];
  'update:value': [value: CascaderModelValue];
  'change': [value: CascaderModelValue];
};
