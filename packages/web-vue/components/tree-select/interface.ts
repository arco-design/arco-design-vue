import { CSSProperties } from 'vue';
import {
  TreeFieldNames,
  TreeNodeData,
  TreeProps,
  TreeNodeKey,
  LoadMore,
  CheckedStrategy,
} from '../tree/interface';
import { Size } from '../_utils/constant';
import { EmitType } from '../_utils/types';

export interface LabelValue {
  value: TreeNodeKey;
  label: string | number;
}

export type TreeSelectValue =
  | TreeNodeKey
  | TreeNodeKey[]
  | LabelValue
  | LabelValue[];

export type FilterTreeNode = (
  searchKey: string,
  nodeData: TreeNodeData
) => boolean;

export type FallbackOption =
  | boolean
  | ((key: TreeNodeKey) => TreeNodeData | boolean);

export type ChangeHandler = (
  selectedValue: TreeSelectValue | undefined
) => void;

export type PopupVisibleChangeHandler = (popupVisible: boolean) => void;

export type SearchHandler = (searchKey: string) => void;

export type ClearHandler = () => void;

export interface TreeSelectProps {
  disabled: boolean;
  loading: boolean;
  error: boolean;
  size: Size;
  border: boolean;
  allowSearch: boolean;
  allowClear: boolean;
  placeholder: string | undefined;
  retainInputValue: boolean;
  maxTagCount: number | undefined;
  defaultValue: TreeSelectValue | undefined;
  modelValue: TreeSelectValue | undefined;
  multiple: boolean;
  fieldNames: TreeFieldNames | undefined;
  data: TreeNodeData[];
  labelInValue: boolean;
  treeCheckable: boolean;
  treeCheckStrictly: boolean;
  treeCheckedStrategy: CheckedStrategy;
  treeProps: Partial<TreeProps> | undefined;
  triggerProps: Partial<Record<string, unknown>> | undefined;
  popupVisible: boolean | undefined;
  defaultPopupVisible: boolean;
  dropdownStyle: CSSProperties | undefined;
  dropdownClassName: string | string[] | undefined;
  filterTreeNode: FilterTreeNode | undefined;
  loadMore: LoadMore | undefined;
  disableFilter: boolean;
  popupContainer: string | HTMLElement | null | undefined;
  fallbackOption: FallbackOption;
  onChange: EmitType<ChangeHandler> | undefined;
  onPopupVisibleChange: EmitType<PopupVisibleChangeHandler> | undefined;
  onSearch: EmitType<SearchHandler> | undefined;
  onClear: EmitType<ClearHandler> | undefined;
}
