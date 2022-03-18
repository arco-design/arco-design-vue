import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { EmitFn } from '../../_utils/types';
import type { TableRowSelection } from '../interface';

export const useRowSelection = ({
  rowSelection,
  currentAllRowKeys,
  currentAllEnabledRowKeys,
  emit,
}: {
  rowSelection: Ref<TableRowSelection | undefined>;
  currentAllRowKeys: Ref<string[]>;
  currentAllEnabledRowKeys: Ref<string[]>;
  emit: EmitFn<'select' | 'selectAll' | 'selectionChange'>;
}) => {
  const isRadio = computed(() => rowSelection.value?.type === 'radio');
  const _selectedRowKeys = ref(
    rowSelection.value?.defaultSelectedRowKeys ?? []
  );
  const selectedRowKeys = computed(
    () => rowSelection.value?.selectedRowKeys ?? _selectedRowKeys.value
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
  };

  const handleSelect = (values: string[]) => {
    _selectedRowKeys.value = values;
    emit('select', values);
    emit('selectionChange', values);
  };

  return {
    isRadio,
    selectedRowKeys,
    currentSelectedRowKeys,
    handleSelectAll,
    handleSelect,
  };
};
