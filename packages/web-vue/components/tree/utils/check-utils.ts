import { Key2TreeNode, Node, TreeNodeKey } from '../interface';

function SetAdd<T>(set: Set<T>): (value: T) => Set<T> {
  return Set.prototype.add.bind(set);
}

function SetDelete<T>(set: Set<T>): (value: T) => boolean {
  return Set.prototype.delete.bind(set);
}

export function isNodeCheckable(node: Node) {
  if (node.disabled || node.disableCheckbox) return false;
  return !!node.checkable;
}

function getChildrenKeys(node: Node) {
  const keys: TreeNodeKey[] = [];
  node.children?.forEach((child) => {
    if (isNodeCheckable(child)) {
      keys.push(child.key, ...getChildrenKeys(child));
    }
  });
  return keys;
}

function updateParent(options: {
  node: Node;
  checkedKeySet: Set<TreeNodeKey>;
  indeterminateKeySet: Set<TreeNodeKey>;
}) {
  const { node, checkedKeySet, indeterminateKeySet } = options;
  let parentNode = node.parent;
  while (parentNode) {
    if (isNodeCheckable(parentNode)) {
      const parentKey = parentNode.key;
      const children = parentNode.children?.filter(isNodeCheckable) || [];
      let checkedCount = 0;
      const total = children.length;
      children.some(({ key: childKey }) => {
        if (checkedKeySet.has(childKey)) {
          checkedCount += 1;
        } else if (indeterminateKeySet.has(childKey)) {
          checkedCount += 0.5;
          return true;
        }
        return false;
      });

      if (checkedCount && checkedCount !== total) {
        indeterminateKeySet.add(parentKey);
      } else {
        indeterminateKeySet.delete(parentKey);
      }

      if (checkedCount && checkedCount === total) {
        checkedKeySet.add(parentKey);
      } else {
        checkedKeySet.delete(parentKey);
      }
    }
    parentNode = parentNode.parent;
  }
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
  const checkedKeySet = new Set(checkedKeys);
  const indeterminateKeySet = new Set(indeterminateKeys);

  // 更新自己
  checked ? checkedKeySet.add(key) : checkedKeySet.delete(key);
  indeterminateKeySet.delete(key);

  if (!checkStrictly) {
    // 更新子节点
    const childKeys = getChildrenKeys(node);
    if (checked) {
      childKeys.forEach(SetAdd(checkedKeySet));
    } else {
      childKeys.forEach(SetDelete(checkedKeySet));
    }
    childKeys.forEach(SetDelete(indeterminateKeySet));

    // 逐级更新父节点的选中状态
    updateParent({ node, checkedKeySet, indeterminateKeySet });
  }

  return [[...checkedKeySet], [...indeterminateKeySet]];
}

export function getCheckedStateByInitKeys(options: {
  initCheckedKeys: TreeNodeKey[];
  key2TreeNode: Key2TreeNode;
  checkStrictly?: boolean;
  onlyCheckLeaf?: boolean;
}) {
  const { initCheckedKeys, key2TreeNode, checkStrictly, onlyCheckLeaf } =
    options;

  const checkedKeySet = new Set<TreeNodeKey>();
  const childCheckedKeySet = new Set<TreeNodeKey>();
  const indeterminateKeySet = new Set<TreeNodeKey>();

  if (!checkStrictly) {
    initCheckedKeys.forEach((key) => {
      const node = key2TreeNode.get(key);
      if (
        !node ||
        childCheckedKeySet.has(key) ||
        (onlyCheckLeaf && node.children?.length)
      ) {
        return;
      }
      // 处理子节点
      const childKeys = getChildrenKeys(node);
      childKeys.forEach(SetAdd(childCheckedKeySet));
      childKeys.forEach(SetDelete(indeterminateKeySet));
      // 处理自身
      checkedKeySet.add(key);
      indeterminateKeySet.delete(key);
      // 处理父节点
      updateParent({ node, checkedKeySet, indeterminateKeySet });
    });
  } else {
    initCheckedKeys.forEach(SetAdd(checkedKeySet));
  }

  return [[...checkedKeySet, ...childCheckedKeySet], [...indeterminateKeySet]];
}
