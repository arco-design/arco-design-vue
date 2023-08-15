import type { CSSProperties, VNode } from 'vue';
import {
  TableColumnData,
  TableDataWithRaw,
  TableOperationColumn,
} from './interface';
import { isArray, isNull, isUndefined } from '../_utils/is';
import {
  resolveProps,
  isNamedComponent,
  isSlotsChildren,
  isArrayChildren,
} from '../_utils/vue-utils';
import { BaseType } from '../_utils/types';

const getDataColumnsNumber = (columns: TableColumnData[]): number => {
  let count = 0;

  const travelColumns = (columns: TableColumnData[]) => {
    if (isArray(columns) && columns.length > 0) {
      for (const item of columns) {
        if (!item.children) {
          count += 1;
        } else {
          travelColumns(item.children);
        }
      }
    }
  };
  travelColumns(columns);

  return count;
};

// Get the total number of rows in the header
const getTotalHeaderRows = (columns: TableColumnData[]): number => {
  let count = 0;
  if (isArray(columns) && columns.length > 0) {
    count = 1;
    for (const item of columns) {
      if (item.children) {
        const depth = getTotalHeaderRows(item.children);
        if (depth > 0) {
          count = Math.max(count, depth + 1);
        }
      }
    }
  }
  return count;
};

const setParentFixed = (column: TableColumnData, fixed: 'left' | 'right') => {
  let { parent } = column;
  while (parent) {
    if (parent.fixed === fixed) {
      if (fixed === 'left') {
        parent.isLastLeftFixed = true;
      } else {
        parent.isFirstRightFixed = true;
      }
    }
    parent = parent.parent;
  }
};

// Get the grouped header row data
export const getGroupColumns = (
  columns: TableColumnData[],
  columnMap: Map<string, TableColumnData>,
  columnWidth: Record<string, number>
) => {
  const totalHeaderRows = getTotalHeaderRows(columns);

  columnMap.clear();
  const dataColumns: TableColumnData[] = [];
  const groupColumns: TableColumnData[][] = [...Array(totalHeaderRows)].map(
    () => []
  );

  // For recording
  let lastLeftFixedIndex: number | undefined;
  let firstRightFixedIndex: number | undefined;

  const travelColumns = (
    columns: TableColumnData[],
    {
      level = 0,
      parent,
      fixed,
    }: {
      level?: number;
      parent?: TableColumnData;
      fixed?: 'left' | 'right';
    } = {}
  ) => {
    for (const item of columns) {
      const cell: TableColumnData = { ...item, parent };
      if (isArray(cell.children)) {
        const colSpan = getDataColumnsNumber(cell.children);
        if (colSpan > 1) {
          cell.colSpan = colSpan;
        }
        groupColumns[level].push(cell);
        travelColumns(cell.children, {
          level: level + 1,
          parent: cell,
          fixed: cell.fixed,
        });
      } else {
        // Minimum header
        const rowSpan = totalHeaderRows - level;
        if (rowSpan > 1) {
          cell.rowSpan = rowSpan;
        }
        if (fixed || cell.fixed) {
          cell.fixed = cell.fixed ?? fixed;
          if (cell.fixed === 'left') {
            lastLeftFixedIndex = dataColumns.length;
          } else if (isUndefined(firstRightFixedIndex)) {
            firstRightFixedIndex = dataColumns.length;
          }
        }

        if (isUndefined(cell.dataIndex) || isNull(cell.dataIndex)) {
          cell.dataIndex = `__arco_data_index_${dataColumns.length}`;
        }

        if (columnWidth[cell.dataIndex]) {
          cell._resizeWidth = columnWidth[cell.dataIndex];
        }

        // dataColumns和groupColumns公用一个cell的引用
        columnMap.set(cell.dataIndex, cell);
        dataColumns.push(cell);
        groupColumns[level].push(cell);
      }
    }
  };

  travelColumns(columns);

  if (!isUndefined(lastLeftFixedIndex)) {
    dataColumns[lastLeftFixedIndex].isLastLeftFixed = true;
    setParentFixed(dataColumns[lastLeftFixedIndex], 'left');
  }
  if (!isUndefined(firstRightFixedIndex)) {
    dataColumns[firstRightFixedIndex].isFirstRightFixed = true;
    setParentFixed(dataColumns[firstRightFixedIndex], 'right');
  }

  return { dataColumns, groupColumns };
};

const getOperationColumnIndex = (
  operations: TableOperationColumn[],
  name: string
) => {
  for (let i = 0; i < operations.length; i++) {
    if (operations[i].name === name) {
      return i;
    }
  }
  return -1;
};

export const getOperationFixedNumber = (
  column: TableOperationColumn,
  operations: TableOperationColumn[]
) => {
  const index = getOperationColumnIndex(operations, column.name);
  if (index <= 0) {
    return 0;
  }
  let count = 0;
  const _operations = operations.slice(0, index);
  for (const item of _operations) {
    count += item.width ?? 0;
  }

  return count;
};

const getFirstDataColumn = (column: TableColumnData): TableColumnData => {
  if (column.children && column.children.length > 0)
    return getFirstDataColumn(column.children[0]);
  return column;
};

const getLastDataColumn = (column: TableColumnData): TableColumnData => {
  if (column.children && column.children.length > 0)
    return getFirstDataColumn(column.children[column.children.length - 1]);
  return column;
};

// Get the location data of a fixed column
export const getFixedNumber = (
  column: TableColumnData,
  {
    dataColumns,
    operations,
  }: {
    dataColumns: TableColumnData[];
    operations: TableOperationColumn[];
  }
) => {
  let count = 0;

  if (column.fixed === 'left') {
    for (const item of operations) {
      count += item.width ?? 40;
    }
    const first = getFirstDataColumn(column);
    for (const item of dataColumns) {
      if (first.dataIndex === item.dataIndex) {
        break;
      }
      count += item._resizeWidth ?? item.width ?? 0;
    }
    return count;
  }

  const last = getLastDataColumn(column);
  for (let i = dataColumns.length - 1; i > 0; i--) {
    const item = dataColumns[i];
    if (last.dataIndex === item.dataIndex) {
      break;
    }

    if (item.fixed === 'right') {
      count += item.width as number;
    }
  }
  return count;
};

export const getOperationFixedCls = (
  prefixCls: string,
  column: TableOperationColumn
): any[] => {
  if (column.fixed) {
    return [
      `${prefixCls}-col-fixed-left`,
      {
        [`${prefixCls}-col-fixed-left-last`]: column.isLastLeftFixed,
      },
    ];
  }
  return [];
};

export const getFixedCls = (
  prefixCls: string,
  column: Pick<
    TableColumnData,
    'fixed' | 'isLastLeftFixed' | 'isFirstRightFixed'
  >
): any[] => {
  if (column.fixed === 'left') {
    return [
      `${prefixCls}-col-fixed-left`,
      {
        [`${prefixCls}-col-fixed-left-last`]: column.isLastLeftFixed,
      },
    ];
  }
  if (column.fixed === 'right') {
    return [
      `${prefixCls}-col-fixed-right`,
      {
        [`${prefixCls}-col-fixed-right-first`]: column.isFirstRightFixed,
      },
    ];
  }
  return [];
};

export const getStyle = (
  column: TableColumnData,
  {
    dataColumns,
    operations,
  }: {
    dataColumns: TableColumnData[];
    operations: TableOperationColumn[];
  }
): CSSProperties => {
  if (column.fixed) {
    const offset = `${getFixedNumber(column, { dataColumns, operations })}px`;
    if (column.fixed === 'left') {
      return {
        left: offset,
      };
    }
    return {
      right: offset,
    };
  }
  return {};
};

export const getOperationStyle = (
  column: TableOperationColumn,
  operations: TableOperationColumn[]
) => {
  if (column.fixed) {
    return {
      left: `${getOperationFixedNumber(column, operations)}px`,
    };
  }
  return {};
};

/**
 * Obtain table column data through the <TableColumnData> component
 * @param {VNode[]} vns
 */
export const getColumnsFromSlot = (vns: VNode[]) => {
  const columns: TableColumnData[] = [];
  for (const vn of vns) {
    if (isNamedComponent(vn, 'TableColumn')) {
      const column = resolveProps(vn) as TableColumnData;
      if (isSlotsChildren(vn, vn.children)) {
        if (vn.children.default) {
          column.children = getColumnsFromSlot(vn.children.default());
        }
        if (vn.children.cell) {
          // @ts-ignore
          column.render = vn.children.cell;
        }
        if (vn.children.title) {
          // @ts-ignore
          column.title = vn.children.title;
        }
      }
      columns.push(column);
    } else if (isArrayChildren(vn, vn.children)) {
      columns.push(...getColumnsFromSlot(vn.children));
    } else if (isArray(vn)) {
      columns.push(...getColumnsFromSlot(vn));
    }
  }
  return columns;
};

export function mapArrayWithChildren<
  T extends Array<{ [key: string]: any; children?: T }>
>(arr: T): T {
  return arr.map((item) => {
    const newItem = { ...item };
    if (newItem.children) {
      newItem.children = mapArrayWithChildren(newItem.children);
    }
    return newItem;
  }) as T;
}

export function mapRawTableData<T extends TableDataWithRaw[]>(
  arr: T
): TableDataWithRaw['raw'][] {
  return arr.map((item) => {
    const rawItem = item.raw;
    if (item.children && rawItem.children) {
      rawItem.children = mapRawTableData(item.children);
    }
    return item.raw;
  });
}

export const getLeafKeys = (record: TableDataWithRaw) => {
  const keys: BaseType[] = [];
  if (record.children) {
    for (const item of record.children) {
      if (item.isLeaf) {
        keys.push(item.key);
      } else {
        keys.push(...getLeafKeys(item));
      }
    }
  }
  return keys;
};

export const getSelectionStatus = (
  selectedRowKeys: BaseType[],
  leafKeys: BaseType[]
) => {
  let checked = false;
  let indeterminate = false;
  const selectedLeafKeys = leafKeys.filter((key) =>
    selectedRowKeys.includes(key)
  );
  if (selectedLeafKeys.length > 0) {
    if (selectedLeafKeys.length >= leafKeys.length) {
      checked = true;
    } else {
      indeterminate = true;
    }
  }

  return {
    checked,
    indeterminate,
  };
};
