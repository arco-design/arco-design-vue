import type { Ref } from 'vue';
import { computed, ref, watch } from 'vue';
import type { Filters, TableColumnData } from '../interface';
import { isEqual } from '../../_utils/is-equal';

export const useFilter = ({
  columns,
  onFilterChange,
}: {
  columns: Ref<TableColumnData[]>;
  onFilterChange: (dataIndex: string, filteredValues: string[]) => void;
}) => {
  const _filters = ref<Filters>(getDefaultFilters(columns.value));

  watch(columns, (columns) => {
    const newFilters = getDefaultFilters(columns);
    if (!isEqual(newFilters, _filters.value)) {
      _filters.value = newFilters;
    }
  });

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

  const resetFilters = (dataIndex?: string | string[]) => {
    const _dataIndex = dataIndex ? ([] as string[]).concat(dataIndex) : [];

    const filters: Filters = {};
    for (const item of columns.value) {
      if (item.dataIndex && item.filterable) {
        if (_dataIndex.length === 0 || _dataIndex.includes(item.dataIndex)) {
          const filteredValue = item.filterable.defaultFilteredValue ?? [];
          filters[item.dataIndex] = filteredValue;
          onFilterChange(item.dataIndex, filteredValue);
        }
      }
    }
    _filters.value = filters;
  };

  const clearFilters = (dataIndex?: string | string[]) => {
    const _dataIndex = dataIndex ? ([] as string[]).concat(dataIndex) : [];

    const filters: Filters = {};
    for (const item of columns.value) {
      if (item.dataIndex && item.filterable) {
        if (_dataIndex.length === 0 || _dataIndex.includes(item.dataIndex)) {
          const filteredValue: string[] = [];
          filters[item.dataIndex] = filteredValue;
          onFilterChange(item.dataIndex, filteredValue);
        }
      }
    }
    _filters.value = filters;
  };

  return {
    _filters,
    computedFilters,
    resetFilters,
    clearFilters,
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
