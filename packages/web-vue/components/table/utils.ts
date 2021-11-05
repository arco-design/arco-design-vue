import type { CSSProperties, VNode } from 'vue';
import { TableCell, TableColumn, TableOperationColumn } from './interface';
import { isArray, isUndefined } from '../_utils/is';
import {
  resolveProps,
  isNamedComponent,
  isSlotsChildren,
} from '../_utils/vue-utils';

const getDataColumnsNumber = (columns: TableColumn[]): number => {
  let count = 0;

  const travelColumns = (columns: TableColumn[]) => {
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
const getTotalHeaderRows = (columns: TableColumn[]): number => {
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

// Get the grouped header row data
export const getGroupColumns = (
  columns: TableColumn[]
): { dataColumns: TableColumn[]; groupColumns: TableColumn[][] } => {
  const totalHeaderRows = getTotalHeaderRows(columns);

  const dataColumns: TableColumn[] = [];
  const groupColumns: TableColumn[][] = [...Array(totalHeaderRows)].map(
    () => []
  );

  // For recording
  let lastLeftFixedIndex: number | undefined;
  let firstRightFixedIndex: number | undefined;

  const travelColumns = (
    columns: TableColumn[],
    level = 0,
    fixed?: 'left' | 'right'
  ) => {
    for (const item of columns) {
      const cell: TableCell = { ...item };
      if (isArray(cell.children)) {
        const colSpan = getDataColumnsNumber(cell.children);
        if (colSpan > 1) {
          cell.colSpan = colSpan;
        }
        groupColumns[level].push(cell);
        travelColumns(cell.children, level + 1, cell.fixed);
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

        if (!cell.dataIndex) {
          cell.dataIndex = `__arco_data_index_${dataColumns.length}`;
        }

        // dataColumns和groupColumns公用一个cell的引用
        dataColumns.push(cell);
        groupColumns[level].push(cell);
      }
    }
  };

  travelColumns(columns);

  if (!isUndefined(lastLeftFixedIndex)) {
    dataColumns[lastLeftFixedIndex].isLastLeftFixed = true;
  }
  if (!isUndefined(firstRightFixedIndex)) {
    dataColumns[firstRightFixedIndex].isFirstRightFixed = true;
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

// Get the location data of a fixed column
export const getFixedNumber = (
  column: TableColumn,
  {
    dataColumns,
    operations,
  }: {
    dataColumns: TableColumn[];
    operations: TableOperationColumn[];
  }
) => {
  let count = 0;

  if (column.fixed === 'left') {
    for (const item of operations) {
      count += item.width ?? 40;
    }

    for (const item of dataColumns) {
      if (column.dataIndex === item.dataIndex) {
        break;
      }
      count += item.width as number;
    }
    return count;
  }

  for (let i = dataColumns.length - 1; i > 0; i--) {
    const item = dataColumns[i];
    if (column.dataIndex === item.dataIndex) {
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
  column: Pick<TableColumn, 'fixed' | 'isLastLeftFixed' | 'isFirstRightFixed'>
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

export const getFiltersAndSorter = (columns: TableColumn[]) => {
  const filters: Record<string, any> = {};
  const sorter: { field?: string; direction?: string } = {};

  for (const item of columns) {
    if (item.filterable) {
      filters[item.dataIndex] =
        item.filterable.filteredValue ?? item.filterable.defaultFilteredValue;
    }
    if (item.sortable && !sorter.field) {
      sorter.field = item.dataIndex;
      sorter.direction =
        item.sortable.sortOrder ?? item.sortable.defaultSortOrder;
    }
  }

  return { filters, sorter };
};

export const getStyle = (
  column: TableColumn,
  {
    dataColumns,
    operations,
  }: {
    dataColumns: TableColumn[];
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
 * Obtain table column data through the <TableColumn> component
 * @param {VNode[]} vns
 */
export const getColumnsFromSlot = (vns: VNode[]) => {
  const columns: TableColumn[] = [];
  for (const vn of vns) {
    if (isNamedComponent(vn, 'TableColumn')) {
      const column = resolveProps(vn) as TableColumn;
      if (isSlotsChildren(vn, vn.children)) {
        if (vn.children.default) {
          column.children = getColumnsFromSlot(vn.children.default());
        }
        if (vn.children.cell) {
          // @ts-ignore
          column.render = vn.children.cell;
        }
      }
      columns.push(column);
    }
  }
  return columns;
};
