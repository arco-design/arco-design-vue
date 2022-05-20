import { getFlattenTreeData, getKey2TreeNode } from '../utils';
import { generateTreeData } from '../utils/tree-data';
import { Node } from '../interface';

describe('tree-data', () => {
  const data = [
    {
      title: 'node1',
      key: 0,
    },
    {
      title: 'node2',
      key: '0',
    },
    {
      title: 'node3',
      key: 3,
    },
    {
      title: 'node4',
      key: 4,
      selectable: false,
      checkable: false,
      draggable: true,
    },
    {
      title: 'node5',
      key: 5,
      selectable: true,
      checkable: true,
      draggable: false,
    },
  ];
  const treeData1 = generateTreeData(data, {
    checkable: true,
    selectable: true,
    draggable: false,

    blockNode: false,
    showLine: false,
    loadMore: false,
  });
  const treeData2 = generateTreeData(data, {
    checkable: false,
    selectable: false,
    draggable: true,

    blockNode: false,
    showLine: false,
    loadMore: false,
  });
  const key2TreeNode1 = getKey2TreeNode(getFlattenTreeData(treeData1));
  const key2TreeNode2 = getKey2TreeNode(getFlattenTreeData(treeData2));

  test('should get right result by key when the type of key is number', () => {
    const node1 = key2TreeNode1.get(0) as unknown as Node;
    const node2 = key2TreeNode1.get('0') as unknown as Node;
    expect(typeof node1).toBe('[Object object]');
    expect(typeof node2).toBe('[Object object]');
    expect(node1.title).toBe('node1');
    expect(node2.title).toBe('node2');
  });

  test('the value of checkable/selectable/draggable should inherit from tree when not specify', () => {
    const node31 = key2TreeNode1.get(3) as unknown as Node;
    const node32 = key2TreeNode2.get(3) as unknown as Node;
    expect(node31.checkable).toBe(true);
    expect(node31.selectable).toBe(true);
    expect(node31.draggable).toBe(false);
    expect(node32.checkable).toBe(false);
    expect(node32.selectable).toBe(false);
    expect(node32.draggable).toBe(true);
  });

  test('the value of checkable/selectable/draggable should cover the tree when specified in node', () => {
    const node41 = key2TreeNode1.get(4) as unknown as Node;
    const node52 = key2TreeNode2.get(5) as unknown as Node;
    expect(node41.checkable).toBe(false);
    expect(node41.selectable).toBe(false);
    expect(node41.draggable).toBe(true);
    expect(node52.checkable).toBe(true);
    expect(node52.selectable).toBe(true);
    expect(node52.draggable).toBe(false);
  });
});
