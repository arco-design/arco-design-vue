import { InjectionKey, Slot } from 'vue';
import { Key2TreeNode } from './utils';
import { Node, DropPosition, TreeNodeKey } from './interface';

export const TreeInjectionKey: InjectionKey<TreeContext> =
  Symbol('TreeInjectionKey');

export type TreeContext = Readonly<{
  switcherIcon?: Slot;
  loadingIcon?: Slot;
  nodeIcon?: Slot;
  dragIcon?: Slot;
  nodeTitle?: Slot;
  nodeExtra?: Slot;
  treeData: Node[];
  flattenTreeData: Node[];
  key2TreeNode: Key2TreeNode;
  checkedKeys: TreeNodeKey[];
  indeterminateKeys: TreeNodeKey[];
  selectedKeys: TreeNodeKey[];
  expandedKeys: TreeNodeKey[];
  loadingKeys: TreeNodeKey[];
  currentExpandKeys: TreeNodeKey[];
  onLoadMore?: (key: TreeNodeKey) => void;
  onCheck: (checked: boolean, key: TreeNodeKey, e?: Event) => void;
  onSelect: (key: TreeNodeKey, e: Event) => void;
  onExpand: (expanded: boolean, key: TreeNodeKey, e?: Event) => void;
  onExpandEnd: (key: TreeNodeKey) => void;
  onDragStart?: (key: TreeNodeKey, e: DragEvent) => void;
  onDragEnd?: (key: TreeNodeKey, e: DragEvent) => void;
  onDragOver?: (key: TreeNodeKey, e: DragEvent) => void;
  onDragLeave?: (key: TreeNodeKey, e: DragEvent) => void;
  onDrop?: (key: TreeNodeKey, dropPosition: DropPosition, e: DragEvent) => void;
  allowDrop?: (key: TreeNodeKey, dropPosition: DropPosition) => boolean;
}>;
