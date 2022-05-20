import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { EmitFn2 } from '../../_utils/types';
import type { TableRowSelection } from '../interface';
import { TableData } from '../interface';

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
    const newSelectedRowKeys = new Set(selectedRowKeys.value);

    for (const key of currentAllEnabledRowKeys.value) {
      if (checked) {
        newSelectedRowKeys.add(key);
      } else {
        newSelectedRowKeys.delete(key);
      }
    }

    _selectedRowKeys.value = [...newSelectedRowKeys];

    emit('selectAll', checked);
    emit('selectionChange', _selectedRowKeys.value);
    emit('update:selectedKeys', _selectedRowKeys.value);
  };

  const handleSelect = (values: string[], value: string, record: TableData) => {
    _selectedRowKeys.value = values;
    emit('select', values, value, record);
    emit('selectionChange', values);
    emit('update:selectedKeys', values);
  };

  return {
    isRadio,
    selectedRowKeys,
    currentSelectedRowKeys,
    handleSelectAll,
    handleSelect,
  };
};
