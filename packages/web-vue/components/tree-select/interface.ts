import { CSSProperties } from 'vue';
import { FieldNames, TreeNodeData, TreeProps } from '../tree/interface';

export interface LabelValue {
  value: string;
  label: string;
}

export type FilterTreeNode = (
  searchKey: string,
  nodeData: TreeNodeData
) => boolean;

export interface TreeSelectProps {
  disabled: boolean;
  /** 是否为加载状态。 */
  loading: boolean;
  /** 是否为错误状态。 */
  error: boolean;
  /** 分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px` */
  size: 'mini' | 'small' | 'medium' | 'large';
  /** 是否需要边框 */
  border: boolean;
  /** 允许清除值。 */
  allowClear: boolean;
  /** 是否可搜索 */
  allowSearch: boolean;
  /** 在搜索框聚焦时保留现有内容 */
  retainInputValue: boolean;
  /** 选择框默认文字。 */
  placeholder?: string;
  /** 最多显示多少个`tag`，仅在多选或标签模式有效。 */
  maxTags?: number;
  /** 是否多选 */
  multiple: boolean;

  defaultValue?: string | string[] | LabelValue | LabelValue[];
  modelValue?: string | string[] | LabelValue | LabelValue[];
  fieldNames?: FieldNames;
  data: TreeNodeData[];
  labelInValue: boolean;
  treeCheckable: boolean;
  treeCheckStrictly: boolean;
  treeCheckedStrategy: TreeProps['checkedStrategy'];
  treeProps?: Partial<TreeProps>;
  triggerProps?: Partial<Record<string, any>>;
  popupVisible: boolean | undefined;
  defaultPopupVisible: boolean;
  disableFilter: boolean;
  /** 下拉框样式 */
  dropdownStyle?: CSSProperties;
  /** 下拉框样式 class */
  dropdownClassName?: string | string[];
  // popupContainer?: HTMLElement;
  filterTreeNode?: FilterTreeNode;
  loadMore?: (nodeData: TreeNodeData) => void;

  onChange?: (value: any) => void;
  onPopupVisibleChange?: (visible: boolean) => void;
  onSearch?: (inputValue: string) => void;
  onClear?: (popupVisible: boolean) => void;
}
