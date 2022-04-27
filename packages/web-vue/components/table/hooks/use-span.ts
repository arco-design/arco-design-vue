import { computed, Ref } from 'vue';
import {
  TableColumnData,
  TableData,
  TableDataWithRaw,
  TableOperationColumn,
} from '../interface';

export const useSpan = ({
  spanMethod,
  data,
  columns,
}: {
  spanMethod: Ref<
    | ((data: {
        record: TableData;
        column: TableColumnData | TableOperationColumn;
        rowIndex: number;
        columnIndex: number;
      }) => { rowspan?: number; colspan?: number } | void)
    | undefined
  >;
  data: Ref<TableDataWithRaw[]>;
  columns: Ref<(TableColumnData | TableOperationColumn)[]>;
}) => {
  const tableSpan = computed(() => {
    const span: Record<string, [number, number]> = {};
    if (spanMethod.value) {
      data.value.forEach((record, rowIndex) => {
        columns.value.forEach((column, columnIndex) => {
          const { rowspan = 1, colspan = 1 } =
            spanMethod.value?.({
              record: record.raw,
              column,
              rowIndex,
              columnIndex,
            }) ?? {};
          if (rowspan > 1 || colspan > 1) {
            span[`${rowIndex}-${columnIndex}`] = [rowspan, colspan];
          }
        });
      });
    }

    return span;
  });

  const removedCells = computed(() => {
    const data: string[] = [];
    for (const indexKey of Object.keys(tableSpan.value)) {
      const indexArray = indexKey.split('-').map((item) => Number(item));
      const span = tableSpan.value[indexKey];
      for (let i = 1; i < span[0]; i++) {
        data.push(`${indexArray[0] + i}-${indexArray[1]}`);
        for (let j = 1; j < span[1]; j++) {
          data.push(`${indexArray[0] + i}-${indexArray[1] + j}`);
        }
      }
      for (let i = 1; i < span[1]; i++) {
        data.push(`${indexArray[0]}-${indexArray[1] + i}`);
      }
    }
    return data;
  });

  return {
    tableSpan,
    removedCells,
  };
};
