import type { InjectionKey, Slots } from 'vue';
import {
  Filters,
  Sorter,
  TableColumnData,
  TableData,
  TableDataWithRaw,
} from './interface';

export interface TableContext {
  loadMore?: (
    record: TableData,
    done: (children?: TableData[]) => void
  ) => void;
  addLazyLoadData: (
    children: TableData[] | undefined,
    record: TableDataWithRaw
  ) => void;
  slots: Slots;
  sorter: Sorter | undefined;
  filters: Filters;
  filterIconAlignLeft: boolean;
  resizingColumn: string;
  addColumn: (id: number, column: TableColumnData) => void;
  removeColumn: (id: number) => void;
  onSorterChange: (
    dataIndex: string,
    direction: 'ascend' | 'descend' | '',
    ev: Event
  ) => void;
  onFilterChange: (
    dataIndex: string,
    filteredValues: string[],
    ev: Event
  ) => void;
  onThMouseDown: (dataIndex: string, ev: MouseEvent) => void;
}

export interface TableColumnContext {
  addChild: (id: number, column: TableColumnData) => void;
  removeChild: (id: number) => void;
}

export const tableInjectionKey: InjectionKey<TableContext> =
  Symbol('ArcoTable');

export const tableColumnInjectionKey: InjectionKey<TableColumnContext> =
  Symbol('ArcoTableColumn');
