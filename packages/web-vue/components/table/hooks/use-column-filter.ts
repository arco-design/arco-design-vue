import type { Ref } from 'vue';
import { computed, ref, watch } from 'vue';
import { isArray } from '../../_utils/is';
import type { TableColumnData } from '../interface';
import type { TableContext } from '../context';

export const useColumnFilter = ({
  column,
  tableCtx,
}: {
  column: Ref<TableColumnData>;
  tableCtx: Partial<TableContext>;
}) => {
  const filterValue = computed(() => {
    if (column.value.dataIndex && tableCtx.filters?.[column.value.dataIndex]) {
      return tableCtx.filters[column.value.dataIndex];
    }
    return [];
  });

  const filterPopupVisible = ref(false);
  const isFilterActive = computed(() => filterValue.value.length > 0);
  const isMultipleFilter = computed(() =>
    Boolean(column.value.filterable?.multiple)
  );
  const columnFilterValue = ref<string[]>(filterValue.value);

  watch(filterValue, (value) => {
    if (isArray(value) && String(value) !== String(columnFilterValue.value)) {
      columnFilterValue.value = value;
    }
  });

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

  const handleFilterConfirm = (ev: Event) => {
    if (column.value.dataIndex) {
      tableCtx.onFilterChange?.(
        column.value.dataIndex,
        columnFilterValue.value,
        ev
      );
    }
    handleFilterPopupVisibleChange(false);
  };

  const handleFilterReset = (ev: Event) => {
    setFilterValue([]);
    if (column.value.dataIndex) {
      tableCtx.onFilterChange?.(
        column.value.dataIndex,
        columnFilterValue.value,
        ev
      );
    }
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
