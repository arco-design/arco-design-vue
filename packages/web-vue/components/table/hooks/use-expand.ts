import { computed, Ref, ref } from 'vue';
import type { TableExpandable } from '../interface';
import type { EmitFn } from '../../_utils/types';

export const useExpand = ({
  expandedKeys,
  defaultExpandedKeys,
  defaultExpandAllRows,
  expandable,
  allRowKeys,
  emit,
}: {
  expandedKeys: Ref<string[] | undefined>;
  defaultExpandedKeys: Ref<string[] | undefined>;
  defaultExpandAllRows: Ref<boolean>;
  expandable: Ref<TableExpandable | undefined>;
  allRowKeys: Ref<string[]>;
  emit: EmitFn<'expand' | 'expandedChange' | 'update:expandedKeys'>;
}) => {
  const getDefaultExpandedRowKeys = (): string[] => {
    if (defaultExpandedKeys.value) {
      return defaultExpandedKeys.value;
    }
    if (expandable.value?.defaultExpandedRowKeys) {
      return expandable.value.defaultExpandedRowKeys;
    }
    if (defaultExpandAllRows.value || expandable.value?.defaultExpandAllRows) {
      return [...allRowKeys.value];
    }
    return [];
  };

  const _expandedRowKeys = ref(getDefaultExpandedRowKeys());

  const expandedRowKeys = computed(
    () =>
      expandedKeys.value ??
      expandable.value?.expandedRowKeys ??
      _expandedRowKeys.value
  );

  const handleExpand = (rowKey: string) => {
    const isExpanded = expandedRowKeys.value.includes(rowKey);
    const newExpandedRowKeys = isExpanded
      ? expandedRowKeys.value.filter((key) => rowKey !== key)
      : expandedRowKeys.value.concat(rowKey);
    _expandedRowKeys.value = newExpandedRowKeys;
    emit('expand', rowKey);
    emit('expandedChange', newExpandedRowKeys);
    emit('update:expandedKeys', newExpandedRowKeys);
  };

  return {
    expandedRowKeys,
    handleExpand,
  };
};
