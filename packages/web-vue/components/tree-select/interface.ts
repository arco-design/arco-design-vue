import { CSSProperties } from 'vue';

import { VirtualListProps } from '../_components/virtual-list/interface';
import { Size } from '../_utils/constant';
import {
  TreeFieldNames,
  TreeNodeData,
  TreeProps,
  TreeNodeKey,
  LoadMore,
  CheckedStrategy,
} from '../tree/interface';
import { TriggerProps } from '../trigger';

export interface LabelValue {
  value: TreeNodeKey;
  label: string | number;
}

export type TreeSelectValue = TreeNodeKey | TreeNodeKey[] | LabelValue | LabelValue[];

export type FilterTreeNode = (searchKey: string, nodeData: TreeNodeData) => boolean;

export type FallbackOption = boolean | ((key: TreeNodeKey) => TreeNodeData | boolean);

export type ChangeHandler = (selectedValue: TreeSelectValue | undefined) => void;

export type PopupVisibleChangeHandler = (popupVisible: boolean) => void;

export type SearchHandler = (searchKey: string) => void;

export type ClearHandler = () => void;

export interface TreeSelectProps {
  disabled: boolean;
  loading: boolean;
  error: boolean;
  size: Size;
  border: boolean;
  allowSearch: boolean | { retainInputValue?: boolean } | undefined;
  filterable: boolean | undefined;
  allowClear: boolean;
  clearable: boolean | undefined;
  showArrow: boolean;
  placeholder: string | undefined;
  maxTagCount: number | 'responsive' | undefined;
  defaultValue: TreeSelectValue | undefined;
  modelValue: TreeSelectValue | undefined;
  value: TreeSelectValue | undefined;
  multiple: boolean;
  fieldNames: TreeFieldNames | undefined;
  data: TreeNodeData[];
  options: TreeNodeData[] | undefined;
  labelInValue: boolean;
  treeCheckable: boolean;
  checkable: boolean | undefined;
  treeCheckStrictly: boolean;
  treeCheckedStrategy: CheckedStrategy;
  checkStrategy: CheckedStrategy | undefined;
  showPath: boolean;
  separator: string;
  treeProps: Partial<TreeProps> | undefined;
  virtualListProps: VirtualListProps | undefined;
  triggerProps: Partial<TriggerProps> | undefined;
  virtualScroll: boolean | undefined;
  popupVisible: boolean | undefined;
  defaultPopupVisible: boolean;
  show: boolean | undefined;
  defaultShow: boolean | undefined;
  dropdownStyle: CSSProperties | undefined;
  dropdownClassName: string | string[] | undefined;
  filterTreeNode: FilterTreeNode | undefined;
  loadMore: LoadMore | undefined;
  disableFilter: boolean;
  popupContainer?: string | HTMLElement;
  fallbackOption: FallbackOption;
  showHeaderOnEmpty?: boolean;
  showFooterOnEmpty?: boolean;
}
