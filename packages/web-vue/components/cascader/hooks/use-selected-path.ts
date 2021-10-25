import { computed, ComputedRef, Ref, ref } from 'vue';
import { CascaderOptionInfo } from '../interface';

export const useSelectedPath = (
  options: Ref<CascaderOptionInfo[]>,
  {
    filteredLeafOptions,
    showSearchPanel,
  }: {
    filteredLeafOptions: ComputedRef<CascaderOptionInfo[]>;
    showSearchPanel: ComputedRef<boolean>;
  }
) => {
  // 当前选中的路径
  const selectedPath = ref<CascaderOptionInfo[]>([]);
  // 当前选中的选项
  const activeNode = ref<CascaderOptionInfo>();
  const displayColumns = computed(() => {
    const columns: CascaderOptionInfo[][] = [options.value];
    for (const item of selectedPath.value) {
      if (item.children) {
        columns.push(item.children);
      }
    }
    return columns;
  });

  const setSelectedPath = (option?: CascaderOptionInfo) => {
    selectedPath.value = option?.path ?? [];
  };

  const setActiveNode = (node?: CascaderOptionInfo) => {
    activeNode.value = node;
  };

  const enabledOptions = computed(() => {
    if (showSearchPanel.value) {
      return filteredLeafOptions.value.filter((item) => !item.disabled);
    }
    if (activeNode.value && activeNode.value.parent) {
      return activeNode.value.parent.children?.filter((item) => !item.disabled);
    }
    return options.value.filter((item) => !item.disabled);
  });

  const getNextActiveNode = (direction: 'next' | 'preview') => {
    const _length = enabledOptions.value?.length ?? 0;

    if (activeNode.value) {
      const enabledIndex =
        enabledOptions.value?.findIndex(
          (item) => item.key === activeNode.value?.key
        ) ?? 0;
      if (direction === 'next') {
        return enabledOptions.value?.[(_length + enabledIndex + 1) % _length];
      }
      return enabledOptions.value?.[(_length + enabledIndex - 1) % _length];
    }

    return enabledOptions.value?.[0];
  };

  return {
    selectedPath,
    activeNode,
    displayColumns,
    setSelectedPath,
    setActiveNode,
    getNextActiveNode,
  };
};
