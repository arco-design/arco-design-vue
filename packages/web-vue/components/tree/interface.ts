/* eslint-disable no-use-before-define */
import { Slot, VNode } from 'vue';
import { VirtualListProps } from '../_components/virtual-list/interface';

export type TreeNodeKey = number | string;

export interface TreeNodeData {
  /**
   * @zh 唯一标示
   * @en Unique key
   * */
  key?: string | number;
  /**
   * @zh 该节点显示的标题
   * @en The title of the node
   * */
  title?: string;
  /**
   * @zh 是否允许选中
   * @en Whether to allow selection
   * */
  selectable?: boolean;
  /**
   * @zh 是否禁用节点
   * @en Whether to disable the node
   * */
  disabled?: boolean;
  /**
   * @zh 是否禁用复选框
   * @en Whether to disable the checkbox
   * */
  disableCheckbox?: boolean;
  /**
   * @zh 是否显示多选框
   * @en Whether to show checkbox
   * */
  checkable?: boolean;
  /**
   * @zh 是否可以拖拽
   * @en Whether it can be dragged
   * */
  draggable?: boolean;
  /**
   * @zh 是否是叶子节点。动态加载时有效
   * @en Whether it is a leaf node. Effective when loading dynamically
   * */
  isLeaf?: boolean;
  /**
   * @zh 节点的图标
   * @en Node icon
   * */
  icon?: () => VNode[];
  /**
   * @zh 定制 switcher 图标，优先级大于 tree
   * @en Custom switcher icon, priority is greater than tree
   * */
  switcherIcon?: () => VNode[];
  /**
   * @zh 定制 loading 图标，优先级大于 tree
   * @en Customize loading icon, priority is greater than tree
   * */
  loadingIcon?: () => VNode[];
  /**
   * @zh 定制 drag 图标，优先级大于 tree
   * @en Custom drag icon, priority is greater than tree
   * */
  dragIcon?: () => VNode[];
  /**
   * @zh 子节点
   * @en Child node
   * */
  children?: TreeNodeData[];
}

export interface TreeNodeProps extends Omit<TreeNodeData, 'children'> {
  selectable: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
  checkable: boolean;
  draggable: boolean;
  isLeaf: boolean;
  isTail: boolean;
  blockNode: boolean;
  showLine: boolean;
  level: number;
  lineless: boolean[];
}

export interface Node extends TreeNodeProps {
  key: TreeNodeKey;
  treeNodeProps: TreeNodeProps;
  treeNodeData: TreeNodeData;
  parent?: Node;
  parentKey?: TreeNodeKey;
  pathParentKeys: TreeNodeKey[];
  children?: Node[];
}

export type FilterTreeNode = (node: TreeNodeData) => boolean;

export interface FieldNames {
  /**
   * @zh 指定 key 在 TreeNodeData 中对应的字段
   */
  key?: string;
  /**
   * @zh 指定 title 在 TreeNodeData 中对应的字段
   */
  title?: string;
  /**
   * 是否禁用
   */
  disabled?: string;

  children?: string;
  isLeaf?: string;
  disableCheckbox?: string;
  checkable?: string;
}

export type LoadMore = (node: TreeNodeData) => Promise<void>;
export type DropPosition = -1 | 0 | 1;

export interface TreeProps {
  size: 'mini' | 'small' | 'medium' | 'large';
  blockNode: boolean;
  defaultExpandAll: boolean;
  multiple: boolean;
  checkable: boolean;
  draggable: boolean;
  allowDrop?: (options: {
    dropNode: TreeNodeData;
    dropPosition: DropPosition;
  }) => boolean;
  selectable: boolean;
  checkStrictly: boolean;
  checkedStrategy: 'all' | 'parent' | 'child';
  defaultSelectedKeys?: TreeNodeKey[];
  selectedKeys?: TreeNodeKey[];
  defaultCheckedKeys?: TreeNodeKey[];
  checkedKeys?: TreeNodeKey[];
  defaultExpandedKeys?: TreeNodeKey[];
  expandedKeys?: TreeNodeKey[];
  data: TreeNodeData[];
  fieldNames?: FieldNames;
  virtualListProps?: VirtualListProps;
  showLine: boolean;
  loadMore?: LoadMore;
  defaultExpandSelected?: boolean;
  defaultExpandChecked?: boolean;
  autoExpandParent?: boolean;
  dragIcon?: Slot;
  switcherIcon?: Slot;
  loadingIcon?: Slot;
  extra?: Slot;
  title?: Slot;
  onSelect?: (
    selectedKeys: TreeNodeKey[],
    event: {
      selected: boolean;
      selectedNodes: TreeNodeData[];
      node: TreeNodeData;
      e: Event;
    }
  ) => void;
  onCheck?: (
    checkedKeys: TreeNodeKey[],
    event: {
      checked: boolean;
      checkedNodes: TreeNodeData[];
      node: TreeNodeData;
      e: Event;
    }
  ) => void;
  onExpand?: (
    expandedKeys: TreeNodeKey[],
    event: {
      expanded: boolean;
      expandedNodes: TreeNodeData[];
      node: TreeNodeData;
      e?: Event;
    }
  ) => void;
  onDragStart?: (e: DragEvent, node: TreeNodeData) => void;
  onDragEnd?: (e: DragEvent, node: TreeNodeData) => void;
  onDragOver?: (e: DragEvent, node: TreeNodeData) => void;
  onDragLeave?: (e: DragEvent, node: TreeNodeData) => void;
  onDrop?: (event: {
    e: DragEvent;
    dragNode: TreeNodeData;
    dropNode: TreeNodeData;
    dropPosition: DropPosition;
  }) => void;
  filterTreeNode?: (node: TreeNodeData) => boolean;
}
