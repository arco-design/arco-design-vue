import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { BaseType, EmitFn2 } from '../../_utils/types';
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
  selectedKeys: Ref<BaseType[] | undefined>;
  defaultSelectedKeys: Ref<BaseType[] | undefined>;
  rowSelection: Ref<TableRowSelection | undefined>;
  currentAllRowKeys: Ref<BaseType[]>;
  currentAllEnabledRowKeys: Ref<BaseType[]>;
  emit: EmitFn2<{
    'update:selectedKeys': (rowKeys: BaseType[]) => true;
    'select': (
      rowKeys: BaseType[],
      rowKey: BaseType,
      record: TableData
    ) => true;
    'selectAll': (checked: boolean) => true;
    'selectionChange': (rowKeys: BaseType[]) => true;
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
    const newKeys = union(
      selectedRowKeys.value,
      currentAllEnabledRowKeys.value,
      !checked
    );
    _selectedRowKeys.value = newKeys;

    emit('selectAll', checked);
    emit('selectionChange', newKeys);
    emit('update:selectedKeys', newKeys);
  };

  const handleSelect = (checked: boolean, record: TableDataWithRaw) => {
    const selectedAllRowKeys = isRadio.value
      ? [record.key]
      : union(selectedRowKeys.value, [record.key], !checked);
    _selectedRowKeys.value = selectedAllRowKeys;
    emit('select', selectedAllRowKeys, record.key, record.raw);
    emit('selectionChange', selectedAllRowKeys);
    emit('update:selectedKeys', selectedAllRowKeys);
  };

  const handleSelectAllLeafs = (record: TableDataWithRaw, checked: boolean) => {
    const newKeys = union(selectedRowKeys.value, getLeafKeys(record), !checked);
    _selectedRowKeys.value = newKeys;
    emit('select', newKeys, record.key, record.raw);
    emit('selectionChange', newKeys);
    emit('update:selectedKeys', newKeys);
  };

  const select = (rowKey: BaseType | BaseType[], checked = true) => {
    const _rowKeys = ([] as BaseType[]).concat(rowKey);
    const newSelectedRowKeys = isRadio.value
      ? _rowKeys
      : union(selectedRowKeys.value, _rowKeys, !checked);
    _selectedRowKeys.value = newSelectedRowKeys;
    emit('selectionChange', newSelectedRowKeys);
    emit('update:selectedKeys', newSelectedRowKeys);
  };

  const selectAll = (checked = true) => {
    const newKeys = union(
      selectedRowKeys.value,
      currentAllEnabledRowKeys.value,
      !checked
    );
    _selectedRowKeys.value = newKeys;

    emit('selectionChange', newKeys);
    emit('update:selectedKeys', newKeys);
  };

  const clearSelected = () => {
    _selectedRowKeys.value = [];

    emit('selectionChange', []);
    emit('update:selectedKeys', []);
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
    clearSelected,
  };
};
