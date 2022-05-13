import { omit } from '../../_utils/omit';
import { isFunction, isUndefined } from '../../_utils/is';
import {
  TreeNodeData,
  Node,
  TreeFieldNames,
  TreeNodeKey,
  SelectableType,
  CheckableType,
} from '../interface';

interface TreeProps {
  fieldNames?: TreeFieldNames;
  selectable: SelectableType;
  checkable: CheckableType;
  blockNode: boolean;
  showLine: boolean;
  loadMore: boolean;
  draggable: boolean;
}

interface NodeOptions {
  treeNodeData: TreeNodeData;
  treeProps: TreeProps;
  parentNode?: Node;
  isTail?: boolean;
}

export const generateKey = (() => {
  let i = 0;

  return () => {
    i += 1;
    return `__arco_tree${i}`;
  };
})();

function getBoolean(val1: boolean | undefined, val2: boolean | undefined) {
  return !!(isUndefined(val1) ? val2 : val1);
}

function mapObject<K, T = any>(
  obj: T,
  nameMap?: Partial<Record<keyof K, string>>
): K {
  const _obj: Record<string, any> = { ...obj };

  if (nameMap) {
    const names = Object.keys(nameMap);
    names.forEach((name) => {
      const sourceName = nameMap[name as keyof typeof nameMap] as keyof T;

      if (sourceName !== name) {
        _obj[name] = obj[sourceName];
        delete _obj[sourceName as string];
      }
    });
  }

  return _obj as K;
}

function getEnableResult({
  subEnable,
  superEnable,
  isLeaf,
  treeNodeData,
  level,
}: {
  subEnable: boolean | undefined;
  superEnable: CheckableType | undefined;
  isLeaf: boolean;
  level: number;
  treeNodeData: TreeNodeData;
}) {
  if (!isUndefined(subEnable)) return subEnable;
  if (isFunction(superEnable)) {
    return superEnable(treeNodeData, { isLeaf, level });
  }
  return superEnable ?? false;
}

function generateNode(options: NodeOptions): Node {
  const { treeNodeData, parentNode, isTail = true, treeProps } = options;
  const { fieldNames } = treeProps || {};

  const mapTreeNodeData = mapObject<TreeNodeData>(treeNodeData, fieldNames);
  const isLeaf = treeProps.loadMore
    ? !!mapTreeNodeData.isLeaf
    : !mapTreeNodeData.children?.length;
  const level = parentNode ? parentNode.level + 1 : 0;

  const treeNodeProps = {
    ...omit(mapTreeNodeData, ['children']),
    key: mapTreeNodeData.key ?? generateKey(),
    selectable: getEnableResult({
      subEnable: mapTreeNodeData.selectable,
      superEnable: treeProps?.selectable,
      isLeaf,
      level,
      treeNodeData,
    }),
    disabled: !!mapTreeNodeData.disabled,
    disableCheckbox: !!mapTreeNodeData.disableCheckbox,
    checkable: getEnableResult({
      subEnable: mapTreeNodeData.checkable,
      superEnable: treeProps?.checkable,
      isLeaf,
      level,
      treeNodeData,
    }),
    isLeaf,
    isTail,
    blockNode: !!treeProps?.blockNode,
    showLine: !!treeProps?.showLine,
    level,
    // showLine 模式下是否显示缩进线。
    // 如果父节点是其所在层级的最后一个节点，那么所有的子节点（包括孙子节点等）在父节点所在层级的缩进格都不显示缩进线。
    lineless: parentNode ? [...parentNode.lineless, parentNode.isTail] : [],
    draggable: getBoolean(mapTreeNodeData.draggable, treeProps?.draggable),
  };

  const node = {
    ...treeNodeProps,
    treeNodeProps,
    treeNodeData,
    parent: parentNode,
    parentKey: parentNode?.key,
    pathParentKeys: parentNode
      ? [...parentNode.pathParentKeys, parentNode.key as TreeNodeKey]
      : [],
  };

  return node;
}

export function generateTreeData(
  treeData: TreeNodeData[],
  treeProps: TreeProps
) {
  function preOrder(tree: TreeNodeData[] | undefined, parentNode?: Node) {
    if (!tree) return undefined;

    const { fieldNames } = treeProps;
    const nodes: Node[] = [];
    tree.forEach((treeNodeData, index) => {
      const node = generateNode({
        treeNodeData,
        treeProps,
        parentNode,
        isTail: index === tree.length - 1,
      });

      node.children = preOrder(
        treeNodeData[
          (fieldNames?.children || 'children') as keyof TreeNodeData
        ] as TreeNodeData['children'],
        node
      );
      nodes.push(node);
    });

    return nodes;
  }

  return preOrder(treeData) as Node[];
}
