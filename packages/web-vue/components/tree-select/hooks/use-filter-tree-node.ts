import { computed, toRefs, watchEffect, ref } from 'vue';
import { debounce } from '../../_utils/debounce';
import {
  TreeFieldNames,
  Node,
  TreeNodeData,
  TreeNodeKey,
} from '../../tree/interface';
import { FilterTreeNode } from '../interface';
import { isUndefined } from '../../_utils/is';

export default function useFilterTreeNode(props: {
  searchValue: string;
  flattenTreeData: Node[];
  filterMethod?: FilterTreeNode;
  disableFilter?: boolean;
  fieldNames: TreeFieldNames | undefined;
}) {
  const {
    searchValue,
    flattenTreeData,
    filterMethod: propFilterMethod,
    disableFilter,
    fieldNames,
  } = toRefs(props);

  const keyField = computed(
    () => (fieldNames.value?.key || 'key') as keyof TreeNodeData
  );

  const defaultFilterMethod = (keyword: string, node: TreeNodeData) => {
    const key = node[keyField.value] as TreeNodeKey;
    return !isUndefined(key) && String(key).indexOf(keyword) > -1;
  };

  const filterMethod = computed(
    () => propFilterMethod?.value || defaultFilterMethod
  );

  const filteredKeysSet = ref<Set<TreeNodeKey>>();

  const isFiltering = computed(() => !!searchValue.value);

  const isEmptyFilterResult = computed(
    () =>
      !disableFilter?.value &&
      isFiltering.value &&
      filteredKeysSet.value &&
      filteredKeysSet.value.size === 0
  );

  const filterTreeNode = computed(() =>
    disableFilter?.value
      ? undefined
      : (node: TreeNodeData) => {
          if (!isFiltering.value) return true;

          const key = node[keyField.value] as TreeNodeKey;
          return filteredKeysSet.value?.has(key || '') ?? false;
        }
  );

  const updateFilteredKeysSet = debounce(
    (treeData: Node[], keyword: string) => {
      const hitNodes = treeData.filter((node) =>
        filterMethod.value(keyword, node.treeNodeData)
      );

      const _keysSet = new Set<TreeNodeKey>();

      hitNodes.forEach((node) => {
        _keysSet.add(node.key);
        node.pathParentKeys.forEach((_key) => {
          _keysSet.add(_key);
        });
      });

      filteredKeysSet.value = _keysSet;
    },
    100
  );

  watchEffect(() => {
    if (disableFilter?.value) {
      filteredKeysSet.value = undefined;
    } else {
      updateFilteredKeysSet(flattenTreeData.value, searchValue.value);
    }
  });

  return {
    isEmptyFilterResult,
    filterTreeNode,
  };
}
