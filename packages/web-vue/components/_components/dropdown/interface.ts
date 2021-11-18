import { RenderFunction } from 'vue';

export interface OptionData {
  /**
   * @zh 选项值
   * @en Option Value
   */
  value: string | number;
  /**
   * @zh 选项内容
   * @en Option content
   */
  label: string;
  /**
   * @zh 自定义渲染
   * @en Custom Render
   */
  render?: RenderFunction;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;

  [other: string]: any;
}

export interface GroupOption {
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
  options: Option[];

  [other: string]: any;
}

/**
 * @zh 选项
 * @en Option
 */
export type Option = string | number | OptionData | GroupOption;

export interface OptionInfo extends OptionData {
  index: number;
  key: string;
  origin: 'children' | 'options' | 'extraOptions';
}

export interface OptionNode {
  type: 'option' | 'optGroup';
  key: string;
  value?: string | number;
  label: string;
  render?: RenderFunction;
  disabled?: boolean;
}

/**
 * @zh 选项过滤
 * @en Option filter
 */
export type FilterOption =
  | boolean
  | ((inputValue: string, optionInfo: OptionInfo) => boolean);
