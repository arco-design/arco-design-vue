import { BaseType, FieldString } from '../_utils/types';
import { TagProps } from '../tag';

export type CascaderOptionValue = BaseType | Record<string, unknown>;

export type CascaderPathValue = CascaderOptionValue[];

export type CascaderSingleValue = CascaderOptionValue | CascaderPathValue;

export type CascaderModelValue = CascaderSingleValue | CascaderSingleValue[] | undefined;

export interface CascaderOption {
  /**
   * @zh 选项值，2.29.0 版本支持对象
   * @en Option value, version 2.29.0 supports objects
   */
  value?: CascaderOptionValue;
  /**
   * @zh 选项文本
   * @en Option text
   */
  label?: string;
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

  [other: string]: unknown;
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
  raw: CascaderOption;
  key: string;
  valueKey: string;
  level: number;
  index: number;
  value: CascaderOptionValue;
  label: string;
  disabled: boolean;
  selectionDisabled: boolean;
  isLeaf: boolean;
  parent?: CascaderOptionInfo;
  children?: CascaderOptionInfo[];
  path: CascaderOptionInfo[];
  pathValue: CascaderPathValue;
}
