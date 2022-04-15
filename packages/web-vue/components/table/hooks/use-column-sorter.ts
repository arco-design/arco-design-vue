import type { Ref } from 'vue';
import { computed } from 'vue';
import type { TableColumnData } from '../interface';
import type { TableContext } from '../context';

export const useColumnSorter = ({
  column,
  tableCtx,
}: {
  column: Ref<TableColumnData>;
  tableCtx: Partial<TableContext>;
}) => {
  const sortOrder = computed(() => {
    if (
      column.value.dataIndex &&
      column.value.dataIndex === tableCtx.sorter?.field
    ) {
      return tableCtx.sorter.direction;
    }
    return undefined;
  });

  const sortDirections = computed(
    () => column.value?.sortable?.sortDirections ?? []
  );

  const hasSorter = computed(() => sortDirections.value.length > 0);

  const hasAscendBtn = computed(() => sortDirections.value.includes('ascend'));
  const hasDescendBtn = computed(() =>
    sortDirections.value.includes('descend')
  );

  const nextSortOrder = computed(() => {
    if (!sortOrder.value) {
      return sortDirections.value[0] ?? '';
    }
    if (sortOrder.value === sortDirections.value[0]) {
      return sortDirections.value[1] ?? '';
    }
    return '';
  });

  const handleClickSorter = (ev: Event) => {
    if (column.value.dataIndex) {
      tableCtx.onSorterChange?.(
        column.value.dataIndex,
        nextSortOrder.value,
        ev
      );
    }
  };

  return {
    sortOrder,
    hasSorter,
    hasAscendBtn,
    hasDescendBtn,
    nextSortOrder,
    handleClickSorter,
  };
};
