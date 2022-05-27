import { isBoolean } from '../../_utils/is';
import { Key2TreeNode, Node } from '../interface';

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

export function getKey2TreeNode(flattenTreeData: Node[]) {
  const key2TreeNode: Key2TreeNode = new Map();
  flattenTreeData.forEach((node) => {
    key2TreeNode.set(node.key, node);
  });
  return key2TreeNode;
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
