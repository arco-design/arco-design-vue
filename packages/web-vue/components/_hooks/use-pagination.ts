import { computed, ref } from 'vue';
import { isObject } from '../_utils/is';

export const usePagination = (props: any, { emit }: { emit: any }) => {
  const _current = ref(
    isObject(props.pagination) ? props.pagination.defaultCurrent ?? 1 : 1
  );
  const _pageSize = ref(
    isObject(props.pagination) ? props.pagination.defaultPageSize ?? 10 : 10
  );

  const current = computed(() =>
    isObject(props.pagination)
      ? props.pagination.current ?? _current.value
      : _current.value
  );

  const pageSize = computed(() =>
    isObject(props.pagination)
      ? props.pagination.pageSize ?? _pageSize.value
      : _pageSize.value
  );

  const handlePageChange = (page: number) => {
    _current.value = page;
    emit('pageChange', page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    _pageSize.value = pageSize;
    emit('pageSizeChange', pageSize);
  };

  return {
    current,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};
