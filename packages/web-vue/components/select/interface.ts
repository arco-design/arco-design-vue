import type { RenderFunction } from 'vue';
import { FieldString } from '../_utils/types';
import { Size } from '../_utils/constant';
import { VirtualListProps } from '../_components/virtual-list-v2/interface';
import { TriggerProps } from '../trigger';

export interface SelectProps {
  options?: (string | number | SelectOptionData | SelectOptionGroup)[];
  multiple?: boolean;
  modelValue?:
    | string
    | number
    | Record<string, unknown>
    | (string | number | Record<string, unknown>)[];
  defaultValue?:
    | string
    | number
    | Record<string, unknown>
    | (string | number | Record<string, unknown>)[];
  inputValue?: string;
  defaultInputValue?: string;
  size?: Size;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
  allowClear?: boolean;
  allowSearch?: boolean | { retainInputValue?: boolean };
  allowCreate?: boolean;
  maxTagCount?: number;
  popupContainer?: string | HTMLElement;
  bordered?: boolean;
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  unmountOnClose?: boolean;
  filterOption?:
    | boolean
    | ((inputValue: string, option: SelectOptionData) => boolean);
  virtualListProps?: VirtualListProps;
  triggerProps?: TriggerProps;
  formatLabel?: (data: SelectOptionData) => string;
  fallbackOption?:
    | boolean
    | ((value: string | number | Record<string, unknown>) => SelectOptionData);
  showExtraOptions?: boolean;
  valueKey?: string;
  searchDelay?: number;
  limit?: number;
  fieldNames?: SelectFieldNames;
  showHeaderOnEmpty?: boolean;
  showFooterOnEmpty?: boolean;
}

export type SelectOptionValue = string | number | Record<string, unknown>;

export interface OptionValueWithKey {
  value: SelectOptionValue;
  key: string;
}

export type SelectFieldNames = FieldString<SelectOptionData>;

export interface SelectOptionData {
  /**
   * @zh 选项值
   * @en Option Value
   */
  value?: string | number | Record<string, unknown>;
  /**
   * @zh 选项内容
   * @en Option content
   */
  label?: string;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 选项对应的多选标签的属性
   * @en Props of the multi-select label corresponding to the option
   */
  tagProps?: any;
  /**
   * @zh 自定义渲染
   * @en Custom Render
   */
  render?: RenderFunction;

  [other: string]: any;
}

export interface SelectOptionGroup {
  /**
   * @zh 是否为选项组
   * @en Whether it is an option group
   */
  isGroup: true;
  /**
   * @zh 选项组标题
   * @en Option group title
   */
  label: string;
  /**
   * @zh 选项组中的选项
   * @en Options in the option group
   */
  options: SelectOption[];

  [other: string]: any;
}

/**
 * @zh 选项
 * @en Option
 */
export type SelectOption =
  | string
  | number
  | SelectOptionData
  | SelectOptionGroup;

export interface SelectOptionInfo extends SelectOptionData {
  raw: Record<string, unknown>;
  key: string;
  index?: number;
  origin: 'slot' | 'options' | 'extraOptions';
  value: SelectOptionValue;
  label: string;
}

export interface SelectOptionGroupInfo extends SelectOptionGroup {
  key: string;
  options: (SelectOptionInfo | SelectOptionGroupInfo)[];
}

/**
 * @zh 筛选
 * @en Filter
 */
export type FilterOption =
  | boolean
  | ((inputValue: string, option: SelectOptionData) => boolean);
