import { computed, Ref, ref } from 'vue';
import type { TableData, TableExpandable } from '../interface';
import type { BaseType, EmitFn2 } from '../../_utils/types';

export const useExpand = ({
  expandedKeys,
  defaultExpandedKeys,
  defaultExpandAllRows,
  expandable,
  allRowKeys,
  emit,
}: {
  expandedKeys: Ref<BaseType[] | undefined>;
  defaultExpandedKeys: Ref<BaseType[] | undefined>;
  defaultExpandAllRows: Ref<boolean>;
  expandable: Ref<TableExpandable | undefined>;
  allRowKeys: Ref<BaseType[]>;
  emit: EmitFn2<{
    'update:expandedKeys': (rowKeys: BaseType[]) => true;
    'expand': (rowKey: BaseType, record: TableData) => true;
    'expandedChange': (rowKeys: BaseType[]) => true;
  }>;
}) => {
  const getDefaultExpandedRowKeys = (): BaseType[] => {
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

  const handleExpand = (rowKey: BaseType, record: TableData) => {
    const isExpanded = expandedRowKeys.value.includes(rowKey);
    const newExpandedRowKeys = isExpanded
      ? expandedRowKeys.value.filter((key) => rowKey !== key)
      : expandedRowKeys.value.concat(rowKey);
    _expandedRowKeys.value = newExpandedRowKeys;
    emit('expand', rowKey, record);
    emit('expandedChange', newExpandedRowKeys);
    emit('update:expandedKeys', newExpandedRowKeys);
  };

  const expand = (rowKey: BaseType | BaseType[], expanded = true) => {
    const _rowKeys = ([] as BaseType[]).concat(rowKey);
    const newExpandedRowKeys = expanded
      ? expandedRowKeys.value.concat(_rowKeys)
      : expandedRowKeys.value.filter((key) => !_rowKeys.includes(key));
    _expandedRowKeys.value = newExpandedRowKeys;
    emit('expandedChange', newExpandedRowKeys);
    emit('update:expandedKeys', newExpandedRowKeys);
  };

  const expandAll = (expanded = true) => {
    const newExpandedRowKeys = expanded ? [...allRowKeys.value] : [];
    _expandedRowKeys.value = newExpandedRowKeys;
    emit('expandedChange', newExpandedRowKeys);
    emit('update:expandedKeys', newExpandedRowKeys);
  };

  return {
    expandedRowKeys,
    handleExpand,
    expand,
    expandAll,
  };
};
