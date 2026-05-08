import type { VirtualListProps } from '../_components/virtual-list-v2/interface';
import type { Size } from '../_utils/constant';
import type { ScrollbarProps } from '../scrollbar';
import type { TriggerProps } from '../trigger';

export type SelectOptionValue = string | number | boolean | Record<string, unknown>;

export type SelectModelValue = SelectOptionValue | SelectOptionValue[] | null | undefined;

export interface OptionValueWithKey {
  value: SelectOptionValue;
  key: string;
}

export interface SelectFieldNames {
  value?: string;
  label?: string;
  children?: string;
  disabled?: string;
  tagProps?: string;
}

export interface SelectOptionData {
  /**
   * @zh 选项值
   * @en Option value
   */
  value?: SelectOptionValue;
  /**
   * @zh 选项内容
   * @en Option label
   */
  label?: string;
  /**
   * @zh 是否禁用
   * @en Whether the option is disabled
   */
  disabled?: boolean;
  /**
   * @zh 多选标签透传属性
   * @en Extra props for rendered tags
   */
  tagProps?: Record<string, unknown>;
  [other: string]: unknown;
}

export interface SelectOptionGroup {
  /**
   * @zh 是否为分组
   * @en Whether the item is a group
   */
  isGroup: true;
  /**
   * @zh 分组标题
   * @en Group label
   */
  label: string;
  /**
   * @zh 分组选项
   * @en Group options
   */
  options: SelectOption[];
  [other: string]: unknown;
}

export type SelectOption = string | number | boolean | SelectOptionData | SelectOptionGroup;

export interface SelectOptionInfo extends SelectOptionData {
  raw: SelectOptionData;
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

export type FilterOption = boolean | ((inputValue: string, option: SelectOptionData) => boolean);

export interface SelectProps {
  options?: SelectOption[];
  multiple?: boolean;
  value?: SelectModelValue;
  modelValue?: SelectModelValue;
  defaultValue?: SelectModelValue;
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
  showArrow?: boolean;
  maxTagCount?: number | 'responsive';
  popupContainer?: string | HTMLElement;
  bordered?: boolean;
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  show?: boolean;
  defaultShow?: boolean;
  defaultActiveFirstOption?: boolean;
  unmountOnClose?: boolean;
  filterOption?: FilterOption;
  virtualListProps?: VirtualListProps;
  triggerProps?: TriggerProps;
  fallbackOption?: boolean | ((value: SelectOptionValue) => SelectOptionData);
  showExtraOptions?: boolean;
  valueKey?: string;
  searchDelay?: number;
  limit?: number;
  fieldNames?: SelectFieldNames;
  scrollbar?: boolean | ScrollbarProps;
  showHeaderOnEmpty?: boolean;
  showFooterOnEmpty?: boolean;
  tagNowrap?: boolean;
}
