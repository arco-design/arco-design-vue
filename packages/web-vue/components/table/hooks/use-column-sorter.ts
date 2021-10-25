import { computed } from 'vue';
import { TableColumn } from '../interface';

export const useColumnSorter = (props, emit) => {
  const { dataIndex, sortable } = props.column as TableColumn;

  const hasSorter = computed(() => Boolean(sortable?.sortDirections?.length));

  const hasAscendBtn = computed(
    () => sortable?.sortDirections?.includes('ascend') ?? false
  );
  const hasDescendBtn = computed(
    () => sortable?.sortDirections?.includes('descend') ?? false
  );

  const nextSortOrder = computed(() => {
    if (!props.sortOrder) {
      return sortable?.sortDirections?.[0] ?? '';
    }
    if (props.sortOrder === sortable?.sortDirections?.[0]) {
      return sortable?.sortDirections[1] ?? '';
    }
    return '';
  });

  const handleClickSorter = (e: Event) => {
    emit('sorterChange', dataIndex, nextSortOrder.value, e);
  };

  return {
    hasSorter,
    hasAscendBtn,
    hasDescendBtn,
    nextSortOrder,
    handleClickSorter,
  };
};
