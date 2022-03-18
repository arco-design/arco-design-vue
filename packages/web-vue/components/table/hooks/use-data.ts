import { TableData } from '../interface';
import { isArray, isFunction } from '../../_utils/is';
import { spliceFromPath } from '../utils';

export const useData = () => {};

const processData = (origin: TableData[]) => {
  const travel = (data: TableData[], prefix?: string) => {
    const result: TableData[] = [];

    for (const _record of data) {
      const record = { ..._record };
      const key = `${prefix ? `${prefix}_` : ''}record_${props.rowKey}_${
        record[props.rowKey]
      }`;
      dataMap.set(key, record);
      record._key = key;

      if (isValidRecord(record)) {
        // add lazy load children
        if (
          props.loadMore &&
          !record.isLeaf &&
          !record.children &&
          lazyLoadData[record[props.rowKey]]
        ) {
          record.children = lazyLoadData[record[props.rowKey]];
        }

        if (record.children) {
          record.children = travel(record.children, key);
        }
        result.push(record);
      }
    }
    return result;
  };
  dataMap.clear();

  const data = travel(isArray(origin) ? origin : []);

  if (data.length > 0) {
    if (computedSorter.value.filed) {
      const column = getColumnByDataIndex(computedSorter.value.filed);
      if (column && column.sortable?.sorter !== true) {
        data.sort((a, b) => {
          const valueA = a[computedSorter.value.filed];
          const valueB = b[computedSorter.value.filed];

          if (column.sortable?.sorter && isFunction(column.sortable.sorter)) {
            return column.sortable.sorter(a, b, {
              dataIndex: computedSorter.value.filed,
              direction: computedSorter.value.direction,
            });
          }

          const result = valueA > valueB ? 1 : -1;
          return computedSorter.value.direction === 'descend'
            ? -result
            : result;
        });
      }
    }

    if (dragState.dragging && dragState.targetPath.length > 0) {
      const target = spliceFromPath(data, dragState.sourcePath);
      spliceFromPath(data, dragState.targetPath, target);
    }
  }

  return data;
};
