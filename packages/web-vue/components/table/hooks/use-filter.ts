import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { Filters, TableColumnData } from '../interface';

export const useFilter = ({ columns }: { columns: Ref<TableColumnData[]> }) => {
  const _filters = ref<Filters>(getDefaultFilters(columns.value));

  const computedFilters = computed<Filters>(() => {
    const filters: Filters = {};
    for (const item of columns.value) {
      if (item.dataIndex) {
        const value =
          item.filterable?.filteredValue ?? _filters.value[item.dataIndex];
        if (value) {
          filters[item.dataIndex] = value;
        }
      }
    }
    return filters;
  });
  return {
    _filters,
    computedFilters,
  };
};

const getDefaultFilters = (columns: TableColumnData[]) => {
  const filters: Filters = {};
  for (const item of columns) {
    if (item.dataIndex && item.filterable?.defaultFilteredValue) {
      filters[item.dataIndex] = item.filterable.defaultFilteredValue;
    }
  }
  return filters;
};
