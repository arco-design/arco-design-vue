import { computed, Ref, ref } from 'vue';
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
  const flattenTableSpan = (
    tableData: TableDataWithRaw[],
    span: Record<string, [number, number]>
  ) => {
    tableData?.forEach((record, rowIndex) => {
      if (record.hasSubtree && record.children?.length) {
        flattenTableSpan(record.children || [], span);
      }
      columns.value.forEach((column, columnIndex) => {
        const { rowspan = 1, colspan = 1 } =
          spanMethod.value?.({
            record: record.raw,
            column,
            rowIndex,
            columnIndex,
          }) ?? {};
        if (rowspan > 1 || colspan > 1) {
          span[`${rowIndex}-${columnIndex}-${record.key}`] = [rowspan, colspan];
          Array.from({ length: rowspan }).forEach((_, r) => {
            if (rowIndex + r < tableData.length) {
              const { key } = tableData[rowIndex + r] ?? {};
              Array.from({ length: colspan }).forEach((_, c) => {
                if (
                  columnIndex + c < columns.value.length &&
                  `${rowIndex}-${columnIndex}-${record.key}` !==
                    `${rowIndex + r}-${columnIndex + c}-${key}`
                ) {
                  spanzero.value[`${rowIndex + r}-${columnIndex + c}-${key}`] =
                    [0, 0];
                }
              });
            }
          });
        }
      });
    });
  };
  let spanzero = ref<Record<string, [number, number]>>({});
  const tableSpan = computed(() => {
    const span: Record<string, [number, number]> = {};
    spanzero.value = {};
    if (spanMethod.value) {
      flattenTableSpan(data.value, span);
    }
    return span;
  });

  const removedCells = computed(() => {
    const data: string[] = [];
    for (const indexKey of Object.keys(spanzero.value)) {
      data.push(indexKey);
    }
    return data;
  });

  return {
    tableSpan,
    removedCells,
  };
};
