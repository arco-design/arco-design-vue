import { RenderFunction } from 'vue';
import { TagProps } from '../tag';
import { BaseType, FieldString } from '../_utils/types';

export type CascaderBaseValue =
  | BaseType
  | Record<string, any>
  | (BaseType | Record<string, any>)[];

export interface CascaderOption {
  /**
   * @zh 选项值，2.29.0 版本支持对象
   * @en Option value, version 2.29.0 supports objects
   */
  value?: string | number | Record<string, any>;
  /**
   * @zh 选项文本
   * @en Option text
   */
  label?: string;
  /**
   * @zh 自定义渲染
   * @en Custom render
   */
  render?: RenderFunction;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 展示的标签属性
   * @en Displayed tag attributes
   * @version 2.8.0
   */
  tagProps?: TagProps;
  /**
   * @zh 下一级选项
   * @en Next level options
   */
  children?: CascaderOption[];
  /**
   * @zh 是否是叶子节点
   * @en Whether it is a leaf node
   */
  isLeaf?: boolean;

  [other: string]: any;
}

export type CascaderFieldNames = FieldString<CascaderOption>;

export interface CascaderOptionWithTotal extends CascaderOption {
  children?: CascaderOptionWithTotal[];
  totalLeafOptions?: number;
}

export interface CascaderNode extends CascaderOption {
  parent?: CascaderNode;
  checked?: boolean;
  indeterminate?: boolean;
  level: number;
  index: number;
  path: CascaderNode[];
  children?: CascaderNode[];
  checkedValues?: Set<string>;
  nodes: CascaderNode[];
  enabledNodes: CascaderNode[];
  raw: CascaderOption;
}

export interface CascaderOptionInfo extends CascaderOptionWithTotal {
  raw: Record<string, unknown>;
  key: string;
  valueKey: string;
  level: number;
  index: number;
  value: string | number;
  label: string;
  disabled: boolean;
  selectionDisabled: boolean;
  isLeaf: boolean;
  parent?: CascaderOptionInfo;
  children?: CascaderOptionInfo[];
  path: CascaderOptionInfo[];
  pathValue: any[];
}
