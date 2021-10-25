import { computed, Ref, ref } from 'vue';
import { TableProps } from '../interface';

export const useRowSelection = (
  props: TableProps,
  {
    allRowKeys,
    currentAllRowKeys,
    currentAllEnabledRowKeys,
  }: {
    allRowKeys: Ref<string[]>;
    currentAllRowKeys: Ref<string[]>;
    currentAllEnabledRowKeys: Ref<string[]>;
  },
  emit
) => {
  const isRadio = computed(() => props.rowSelection?.type === 'radio');
  const _selectedRowKeys = ref(
    props.rowSelection?.defaultSelectedRowKeys ?? []
  );
  const selectedRowKeys = computed(
    () => props.rowSelection?.selectedRowKeys ?? _selectedRowKeys.value
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
