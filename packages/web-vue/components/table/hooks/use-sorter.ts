import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import { isString } from '../../_utils/is';
import type { Sorter, TableColumnData } from '../interface';

export const useSorter = ({ columns }: { columns: Ref<TableColumnData[]> }) => {
  const _sorter = ref<Sorter | undefined>(getDefaultSorter(columns.value));

  const computedSorter = computed<Sorter | undefined>(() => {
    for (const item of columns.value) {
      if (item.dataIndex && item.sortable) {
        // Take the first existing collation
        const direction = isString(item.sortable.sortOrder)
          ? item.sortable.sortOrder
          : _sorter.value?.field === item.dataIndex
          ? _sorter.value.direction
          : '';
        if (direction) {
          return {
            field: item.dataIndex,
            direction,
          };
        }
      }
    }
    return undefined;
  });

  return {
    _sorter,
    computedSorter,
  };
};

const getDefaultSorter = (columns: TableColumnData[]): Sorter | undefined => {
  for (const item of columns) {
    // get first enabled sorter
    if (item.dataIndex && item.sortable?.defaultSortOrder) {
      return {
        field: item.dataIndex,
        direction: item.sortable.defaultSortOrder,
      };
    }
  }
  return undefined;
};
