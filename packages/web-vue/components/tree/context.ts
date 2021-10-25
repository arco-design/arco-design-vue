import { InjectionKey, Slot } from 'vue';
import { Key2TreeNode } from './utils';
import { Node, DropPosition } from './interface';

export const TreeInjectionKey: InjectionKey<string> =
  Symbol('TreeInjectionKey');

export type TreeContext = Readonly<{
  switcherIcon?: Slot;
  loadingIcon?: Slot;
  dragIcon?: Slot;
  nodeTitle?: Slot;
  nodeExtra?: Slot;
  treeData: Node[];
  flattenTreeData: Node[];
  key2TreeNode: Key2TreeNode;
  checkedKeys: string[];
  indeterminateKeys: string[];
  selectedKeys: string[];
  expandedKeys: string[];
  loadingKeys: string[];
  currentExpandKeys: string[];
  onLoadMore?: (key: string) => void;
  onCheck: (checked: boolean, key: string, e: Event) => void;
  onSelect: (key: string, e: Event) => void;
  onExpand: (expanded: boolean, key: string, e?: Event) => void;
  onExpandEnd: (key: string) => void;
  onDragStart?: (key: string, e: DragEvent) => void;
  onDragEnd?: (key: string, e: DragEvent) => void;
  onDragOver?: (key: string, e: DragEvent) => void;
  onDragLeave?: (key: string, e: DragEvent) => void;
  onDrop?: (key: string, dropPosition: DropPosition, e: DragEvent) => void;
  allowDrop?: (key: string, dropPosition: DropPosition) => boolean;
}>;
