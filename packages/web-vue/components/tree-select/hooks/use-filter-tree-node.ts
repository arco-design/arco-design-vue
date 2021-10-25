import { computed, toRefs, watchEffect, ref } from 'vue';
import { debounce } from '../../_utils/debounce';
import { Node, TreeNodeData } from '../../tree/interface';
import { FilterTreeNode } from '../interface';

export default function useFilterTreeNode(props: {
  searchValue: string;
  flattenTreeData: Node[];
  filterMethod?: FilterTreeNode;
  disableFilter?: boolean;
}) {
  const {
    searchValue,
    flattenTreeData,
    filterMethod: propFilterMethod,
    disableFilter,
  } = toRefs(props);

  const defaultFilterMethod = (keyword: string, node: TreeNodeData) => {
    return !!node.key && node.key.indexOf(keyword) > -1;
  };

  const filterMethod = computed(
    () => propFilterMethod?.value || defaultFilterMethod
  );

  const filteredKeysSet = ref<Set<string>>();

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
          return (
            !isFiltering.value || !!filteredKeysSet.value?.has(node.key || '')
          );
        }
  );

  const updateFilteredKeysSet = debounce(
    (treeData: Node[], keyword: string) => {
      const hitNodes = treeData.filter((node) =>
        filterMethod.value(keyword, node.treeNodeData)
      );

      const _keysSet = new Set<string>();

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
