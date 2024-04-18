import { ref, toRefs, watchEffect } from 'vue';
import {
  TreeFieldNames,
  TreeNodeData,
  Node,
  LoadMore,
  CheckableType,
  SelectableType,
  Key2TreeNode,
} from '../interface';
import { generateTreeData } from '../utils/tree-data';

export default function useTreeData(props: {
  treeData: TreeNodeData[];
  fieldNames?: TreeFieldNames;
  selectable?: SelectableType;
  showLine?: boolean;
  blockNode?: boolean;
  checkable?: CheckableType;
  loadMore?: LoadMore;
  draggable?: boolean;
}) {
  const {
    treeData: propTreeData,
    fieldNames,
    selectable,
    showLine,
    blockNode,
    checkable,
    loadMore,
    draggable,
  } = toRefs(props);

  const treeData = ref<Node[]>([]);
  const flattenTreeData = ref<Node[]>([]);
  const key2TreeNode = ref<Key2TreeNode>({} as Key2TreeNode);
  watchEffect(() => {
    const {
      treeData: _treeData,
      key2TreeNode: _key2TreeNode,
      flattenTreeData: _flattenTreeData,
    } = generateTreeData(propTreeData.value || [], {
      selectable: selectable?.value ?? false,
      showLine: !!showLine?.value,
      blockNode: !!blockNode?.value,
      checkable: checkable?.value ?? false,
      fieldNames: fieldNames?.value,
      loadMore: !!loadMore?.value,
      draggable: !!draggable?.value,
    });
    treeData.value = _treeData;
    key2TreeNode.value = _key2TreeNode;
    flattenTreeData.value = _flattenTreeData;
  });

  return { treeData, flattenTreeData, key2TreeNode };
}
