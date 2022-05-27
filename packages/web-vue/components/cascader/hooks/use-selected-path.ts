import { computed, ComputedRef, Ref, ref } from 'vue';
import { CascaderOptionInfo } from '../interface';

export const useSelectedPath = (
  options: Ref<CascaderOptionInfo[]>,
  {
    optionMap,
    filteredLeafOptions,
    showSearchPanel,
    expandChild,
  }: {
    optionMap: Map<string, CascaderOptionInfo>;
    filteredLeafOptions: ComputedRef<CascaderOptionInfo[]>;
    showSearchPanel?: ComputedRef<boolean>;
    expandChild: Ref<boolean>;
  }
) => {
  // active node key
  const activeKey = ref<string>();
  const activeOption = computed(() => {
    if (activeKey.value) return optionMap.get(activeKey.value);
    return undefined;
  });

  // selected nodes key
  const selectedPath = ref<string[]>([]);

  const displayColumns = computed(() => {
    const columns: CascaderOptionInfo[][] = [options.value];
    for (const key of selectedPath.value) {
      const option = optionMap.get(key);
      if (option?.children) {
        columns.push(option.children);
      }
    }
    return columns;
  });

  const setSelectedPath = (key?: string) => {
    const option = getTargetOption(key);
    selectedPath.value = option?.path.map((item) => item.key) ?? [];
  };

  const setActiveKey = (key?: string) => {
    activeKey.value = key;
  };

  const enabledOptions = computed(() => {
    if (showSearchPanel?.value) {
      return filteredLeafOptions.value.filter((item) => !item.disabled);
    }
    if (activeOption.value && activeOption.value.parent) {
      return activeOption.value.parent.children?.filter(
        (item) => !item.disabled
      );
    }
    return options.value.filter((item) => !item.disabled);
  });

  const getTargetOption = (key?: string) => {
    let target = key ? optionMap.get(key) : undefined;
    if (expandChild.value) {
      while (target && target.children && target.children.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        target = target.children[0];
      }
    }
    return target;
  };

  const getNextActiveNode = (direction: 'next' | 'preview') => {
    const _length = enabledOptions.value?.length ?? 0;

    if (activeKey.value) {
      const enabledIndex =
        enabledOptions.value?.findIndex(
          (item) => item.key === activeKey.value
        ) ?? 0;
      if (direction === 'next') {
        return enabledOptions.value?.[(_length + enabledIndex + 1) % _length];
      }
      return enabledOptions.value?.[(_length + enabledIndex - 1) % _length];
    }

    return enabledOptions.value?.[0];
  };

  return {
    activeKey,
    activeOption,
    selectedPath,
    displayColumns,
    setActiveKey,
    setSelectedPath,
    getNextActiveNode,
  };
};
