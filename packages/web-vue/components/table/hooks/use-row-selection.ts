import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { EmitFn2 } from '../../_utils/types';
import type { TableDataWithRaw, TableRowSelection } from '../interface';
import { TableData } from '../interface';
import { getLeafKeys } from '../utils';
import { union } from '../../_utils/array';

export const useRowSelection = ({
  selectedKeys,
  defaultSelectedKeys,
  rowSelection,
  currentAllRowKeys,
  currentAllEnabledRowKeys,
  emit,
}: {
  selectedKeys: Ref<string[] | undefined>;
  defaultSelectedKeys: Ref<string[] | undefined>;
  rowSelection: Ref<TableRowSelection | undefined>;
  currentAllRowKeys: Ref<string[]>;
  currentAllEnabledRowKeys: Ref<string[]>;
  emit: EmitFn2<{
    'update:selectedKeys': (rowKeys: string[]) => true;
    'select': (rowKeys: string[], rowKey: string, record: TableData) => true;
    'selectAll': (checked: boolean) => true;
    'selectionChange': (rowKeys: string[]) => true;
  }>;
}) => {
  const isRadio = computed(() => rowSelection.value?.type === 'radio');
  const _selectedRowKeys = ref(
    defaultSelectedKeys.value ??
      rowSelection.value?.defaultSelectedRowKeys ??
      []
  );
  const selectedRowKeys = computed(
    () =>
      selectedKeys.value ??
      rowSelection.value?.selectedRowKeys ??
      _selectedRowKeys.value
  );
  const currentSelectedRowKeys = computed(() =>
    selectedRowKeys.value.filter((key) => currentAllRowKeys.value.includes(key))
  );

  const handleSelectAll = (checked: boolean) => {
    _selectedRowKeys.value = union(
      selectedRowKeys.value,
      currentAllEnabledRowKeys.value,
      !checked
    );

    emit('selectAll', checked);
    emit('selectionChange', _selectedRowKeys.value);
    emit('update:selectedKeys', _selectedRowKeys.value);
  };

  const handleSelect = (values: string[], record: TableDataWithRaw) => {
    _selectedRowKeys.value = values;
    emit('select', values, record.key, record.raw);
    emit('selectionChange', values);
    emit('update:selectedKeys', values);
  };

  const handleSelectAllLeafs = (record: TableDataWithRaw, checked: boolean) => {
    const newKeys = union(selectedRowKeys.value, getLeafKeys(record), !checked);
    handleSelect(newKeys, record);
  };

  const select = (rowKey: string | string[], checked = true) => {
    const _rowKeys = ([] as string[]).concat(rowKey);
    const newSelectedRowKeys = checked
      ? selectedRowKeys.value.concat(_rowKeys)
      : selectedRowKeys.value.filter((key) => !_rowKeys.includes(key));
    _selectedRowKeys.value = newSelectedRowKeys;
    emit('selectionChange', newSelectedRowKeys);
    emit('update:selectedKeys', newSelectedRowKeys);
  };

  const selectAll = (checked = true) => {
    const newSelectedRowKeys = union(
      selectedRowKeys.value,
      currentAllEnabledRowKeys.value,
      !checked
    );
    _selectedRowKeys.value = newSelectedRowKeys;
    emit('selectionChange', newSelectedRowKeys);
    emit('update:selectedKeys', newSelectedRowKeys);
  };

  return {
    isRadio,
    selectedRowKeys,
    currentSelectedRowKeys,
    handleSelectAll,
    handleSelect,
    handleSelectAllLeafs,
    select,
    selectAll,
  };
};
