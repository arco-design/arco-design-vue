import { isBoolean } from '../../_utils/is';
import { Node, TreeNodeKey } from '../interface';

export function getFlattenTreeData(tree: Node[]) {
  const flattenTreeData: Node[] = [];

  function preOrder(tree: Node[] | undefined) {
    if (!tree) return;
    tree.forEach((node) => {
      flattenTreeData.push(node);
      preOrder(node.children);
    });
  }

  preOrder(tree);

  return flattenTreeData;
}

export type Key2TreeNode = Record<TreeNodeKey, Node>;
export function getKey2TreeNode(flattenTreeData: Node[]) {
  const key2TreeNode: Key2TreeNode = {};
  flattenTreeData.forEach((node) => {
    key2TreeNode[node.key] = node;
  });
  return key2TreeNode;
}

export function getChildrenKeys(node: Node, filter?: (node: Node) => boolean) {
  const keys: TreeNodeKey[] = [];

  if (node.children) {
    const filterMethod = (node: Node) => {
      return !filter || filter(node);
    };

    node.children.forEach((child) => {
      if (filterMethod(child)) {
        keys.push(child.key);

        if (child?.children?.length) {
          const childKeys = getChildrenKeys(child, filter);
          keys.push(...childKeys);
        }
      }
    });
  }

  return keys;
}

export function isNodeCheckable(node: Node) {
  return node.checkable && !node.disabled && !node.disableCheckbox;
}

export function isNodeSelectable(node: Node) {
  return node.selectable && !node.disabled;
}

export function isNodeExpandable(node: Node) {
  return !node.isLeaf && node.children;
}

export function isLeafNode(node: Node) {
  if (isBoolean(node.isLeaf)) return node.isLeaf;
  return !node.children;
}

export function getCheckedStateByCheck(options: {
  node: Node;
  checked: boolean;
  checkedKeys: TreeNodeKey[];
  indeterminateKeys: TreeNodeKey[];
  checkStrictly?: boolean;
}) {
  const {
    node,
    checked,
    checkedKeys,
    indeterminateKeys,
    checkStrictly = false,
  } = options;

  const { key } = node;
  const checkedKeysSet = new Set(checkedKeys);
  const indeterminateKeysSet = new Set(indeterminateKeys);

  // 更新自己
  checked ? checkedKeysSet.add(key) : checkedKeysSet.delete(key);
  indeterminateKeysSet.delete(key);

  if (!checkStrictly) {
    // 更新子节点
    updateChildrenCheckState({
      node,
      checked,
      checkedKeysSet,
      indeterminateKeysSet,
    });

    // 逐级更新父节点的选中状态。
    updateParentCheckState({
      node,
      checkedKeysSet,
      indeterminateKeysSet,
    });
  }

  return [[...checkedKeysSet], [...indeterminateKeysSet]];
}

export function getCheckedStateByInitKeys(options: {
  initCheckedKeys: TreeNodeKey[];
  key2TreeNode: Key2TreeNode;
  checkStrictly?: boolean;
  onlyCheckLeaf?: boolean;
}) {
  const { initCheckedKeys, key2TreeNode, checkStrictly, onlyCheckLeaf } =
    options;

  let checkedKeysSet = new Set<TreeNodeKey>();
  let indeterminateKeys: TreeNodeKey[] = [];

  if (!checkStrictly) {
    initCheckedKeys.forEach((key) => {
      if (!checkedKeysSet.has(key)) {
        const node = key2TreeNode[key];
        if (node && (!onlyCheckLeaf || isLeafNode(node))) {
          const [newCheckedKeys, newIndeterminateKeys] = getCheckedStateByCheck(
            {
              node,
              checkedKeys: [...checkedKeysSet],
              indeterminateKeys,
              checked: true,
              checkStrictly,
            }
          );

          checkedKeysSet = new Set(newCheckedKeys);
          indeterminateKeys = newIndeterminateKeys;
        }
      }
    });
  } else {
    checkedKeysSet = new Set(initCheckedKeys);
  }

  return [[...checkedKeysSet], indeterminateKeys];
}

// 更新子节点状态
function updateChildrenCheckState(options: {
  node: Node;
  checked: boolean;
  checkedKeysSet: Set<TreeNodeKey>;
  indeterminateKeysSet: Set<TreeNodeKey>;
}) {
  const { node, checked, checkedKeysSet, indeterminateKeysSet } = options;

  const checkableChildKeys = getChildrenKeys(node, isNodeCheckable);

  if (checked) {
    // 选中了节点，就找到所有符合条件的子节点的 key.
    checkableChildKeys.forEach((v) => {
      checkedKeysSet.add(v);
    });
  } else {
    // 移除所有符合条件的子节点的key
    checkableChildKeys.forEach((v) => {
      checkedKeysSet.delete(v);
    });
  }

  return [checkedKeysSet, indeterminateKeysSet];
}

// 逐级更新父节点的选中状态
function updateParentCheckState(options: {
  node: Node;
  checkedKeysSet: Set<TreeNodeKey>;
  indeterminateKeysSet: Set<TreeNodeKey>;
}) {
  const { node, checkedKeysSet, indeterminateKeysSet } = options;

  let parentNode = node.parent;
  while (parentNode) {
    if (isNodeCheckable(parentNode)) {
      const { key: parentKey, children } = parentNode;

      const { checked, indeterminate } = getStateFromNodes({
        nodes: children || [],
        checkedKeysSet,
        indeterminateKeysSet,
      });

      checked
        ? checkedKeysSet.add(parentKey)
        : checkedKeysSet.delete(parentKey);
      indeterminate
        ? indeterminateKeysSet.add(parentKey)
        : indeterminateKeysSet.delete(parentKey);
    }
    parentNode = parentNode.parent;
  }

  return [checkedKeysSet, indeterminateKeysSet];
}

function getStateFromNodes(options: {
  nodes: Node[];
  checkedKeysSet: Set<TreeNodeKey>;
  indeterminateKeysSet: Set<TreeNodeKey>;
}) {
  const { nodes, checkedKeysSet, indeterminateKeysSet } = options;

  let checkedCount = 0;
  let indeterminate = false;

  const checkableNodes = nodes.filter(isNodeCheckable);

  for (let i = 0; i < checkableNodes.length; i++) {
    const child = checkableNodes[i];
    const childChecked = checkedKeysSet.has(child.key);
    const childIndeterminate = indeterminateKeysSet.has(child.key);
    if (childChecked) {
      checkedCount++;
    }
    if (childIndeterminate || (!childChecked && checkedCount > 0)) {
      indeterminate = true;
      break;
    }
  }

  const checked = checkedCount === checkableNodes.length;

  return {
    checked,
    indeterminate: indeterminate || (!checked && checkedCount > 0),
  };
}
