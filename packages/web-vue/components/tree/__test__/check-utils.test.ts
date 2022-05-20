import { Node } from '../interface';
import { getFlattenTreeData, getKey2TreeNode } from '../utils';
import {
  getCheckedStateByCheck,
  getCheckedStateByInitKeys,
} from '../utils/check-utils';
import { generateTreeData } from '../utils/tree-data';

describe('checkUtils', () => {
  const data = [
    {
      title: 'Root',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch',
          key: '0-0-2',
          disableCheckbox: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
  ];
  const treeData = generateTreeData(data, {
    checkable: true,
    selectable: true,
    blockNode: false,
    showLine: false,
    loadMore: false,
    draggable: false,
  });
  const flattenTreeData = getFlattenTreeData(treeData);
  const key2TreeNode = getKey2TreeNode(flattenTreeData);
  const checkedKey = data[0].key;
  const checkedNode = key2TreeNode.get(checkedKey) as unknown as Node;

  test("[getCheckedStateByCheck] node should not be checked when it's disable or disableCheckbox is true", () => {
    let [checkedResult] = getCheckedStateByCheck({
      node: checkedNode,
      checked: true,
      checkedKeys: [],
      indeterminateKeys: [],
      checkStrictly: false,
    });
    expect(checkedResult.length).toBe(2);

    [checkedResult] = getCheckedStateByCheck({
      node: checkedNode,
      checked: false,
      checkedKeys: checkedResult,
      indeterminateKeys: [],
      checkStrictly: false,
    });
    expect(checkedResult.length).toBe(0);
  });

  test('[getCheckedStateByCheck] Only check itself when checkStrictly is true', () => {
    let [checkedResult] = getCheckedStateByCheck({
      node: checkedNode,
      checked: true,
      checkedKeys: [],
      indeterminateKeys: [],
      checkStrictly: true,
    });
    expect(checkedResult.length).toBe(1);

    [checkedResult] = getCheckedStateByCheck({
      node: checkedNode,
      checked: false,
      checkedKeys: ['0-0', '0-0-1'],
      indeterminateKeys: [],
      checkStrictly: true,
    });
    expect(checkedResult.length).toBe(1);
  });

  test("[getCheckedStateByInitKeys] node should not be checked when it's disable or disableCheckbox is true", () => {
    const [result] = getCheckedStateByInitKeys({
      initCheckedKeys: ['0-0'],
      key2TreeNode,
    });
    expect(result.length).toBe(2);
  });

  test('[getCheckedStateByInitKeys] Only check itself when checkStrictly is true', () => {
    const [result] = getCheckedStateByInitKeys({
      initCheckedKeys: ['0-0'],
      key2TreeNode,
      checkStrictly: true,
    });
    expect(result.length).toBe(1);
  });

  test('[getCheckedStateByInitKeys] Only check leaf when onlyCheckLeaf is true', () => {
    let [result] = getCheckedStateByInitKeys({
      initCheckedKeys: ['0-0'],
      key2TreeNode,
      onlyCheckLeaf: true,
    });
    expect(result.length).toBe(0);

    [result] = getCheckedStateByInitKeys({
      initCheckedKeys: ['0-0', '0-0-1'],
      key2TreeNode,
      onlyCheckLeaf: true,
    });
    expect(result.length).toBe(2);
  });

  test('Stop updating the parent node when the node is disabled', () => {
    let [checkedResult, indeterminateResult] = getCheckedStateByCheck({
      node: key2TreeNode.get('0-0-2-1') as any,
      checked: true,
      checkedKeys: [],
      indeterminateKeys: [],
      checkStrictly: false,
    });
    expect(checkedResult.length).toBe(1);
    expect(indeterminateResult.length).toBe(0);

    [checkedResult, indeterminateResult] = getCheckedStateByInitKeys({
      initCheckedKeys: ['0-0-2-1'],
      key2TreeNode,
    });
    expect(checkedResult.length).toBe(1);
    expect(indeterminateResult.length).toBe(0);
  });
});
