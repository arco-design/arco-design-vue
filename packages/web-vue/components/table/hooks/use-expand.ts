import { computed, ref } from 'vue';
import { TableProps } from '../interface';

export const useExpand = (
  props: TableProps,
  allRowKeys: string[],
  emit: any
) => {
  const getDefaultExpandedRowKeys = (): string[] => {
    if (props.expandable?.defaultExpandedRowKeys) {
      return props.expandable?.defaultExpandedRowKeys;
    }
    if (props.expandable?.defaultExpandAllRows) {
      return [...allRowKeys];
    }
    return [];
  };

  const _expandedRowKeys = ref(getDefaultExpandedRowKeys());

  const expandedRowKeys = computed(
    () => props.expandable?.expandedRowKeys ?? _expandedRowKeys.value
  );

  const handleExpand = (rowKey: string) => {
    const isExpanded = expandedRowKeys.value.includes(rowKey);
    const newExpandedRowKeys = isExpanded
      ? expandedRowKeys.value.filter((key) => rowKey !== key)
      : expandedRowKeys.value.concat(rowKey);
    _expandedRowKeys.value = newExpandedRowKeys;
    emit('expand', rowKey);
    emit('expandedChange', newExpandedRowKeys);
  };

  return {
    expandedRowKeys,
    handleExpand,
  };
};
