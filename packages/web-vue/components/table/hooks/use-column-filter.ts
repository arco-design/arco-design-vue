import { computed, ref, watch } from 'vue';
import { isArray } from '../../_utils/is';
import { TableColumn } from '../interface';

export const useColumnFilter = (props, emit) => {
  const { dataIndex, filterable } = props.column as TableColumn;

  const filterPopupVisible = ref(false);
  const isFilterActive = computed(
    () => isArray(props.filterValue) && props.filterValue.length > 0
  );
  const isMultipleFilter = computed(() => Boolean(filterable?.multiple));
  const columnFilterValue = ref<string[]>(props.filterValue ?? []);

  watch(
    () => props.filterValue,
    (value) => {
      if (isArray(value) && String(value) !== String(columnFilterValue.value)) {
        columnFilterValue.value = value;
      }
    }
  );

  const handleFilterPopupVisibleChange = (value: boolean) => {
    filterPopupVisible.value = value;
  };

  const setFilterValue = (filterValue: string[]) => {
    columnFilterValue.value = filterValue;
  };

  const handleCheckboxFilterChange = (values: string[]) => {
    setFilterValue(values);
  };

  const handleRadioFilterChange = (value: string) => {
    setFilterValue([value]);
  };

  const handleFilterConfirm = (e: Event) => {
    emit('filterChange', dataIndex, columnFilterValue.value, e);
    handleFilterPopupVisibleChange(false);
  };

  const handleFilterReset = (e: Event) => {
    setFilterValue([]);
    emit('filterChange', dataIndex, columnFilterValue.value, e);
    handleFilterPopupVisibleChange(false);
  };

  return {
    filterPopupVisible,
    isFilterActive,
    isMultipleFilter,
    columnFilterValue,
    handleFilterPopupVisibleChange,
    setFilterValue,
    handleCheckboxFilterChange,
    handleRadioFilterChange,
    handleFilterConfirm,
    handleFilterReset,
  };
};
