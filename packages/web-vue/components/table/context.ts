import type { InjectionKey, Slots } from 'vue';
import { Filters, Sorter, TableColumn, TableData } from './interface';

export interface TableContext {
  loadMore?: (
    record: TableData,
    done: (children?: TableData[]) => void
  ) => void;
  addLazyLoadData: (
    children: TableData[] | undefined,
    record: TableData
  ) => void;
  slots: Slots;
  sorter: Sorter | undefined;
  filters: Filters;
  filterIconAlignLeft: boolean;
  resizingColumn: string;
  addColumn: (id: number, column: TableColumn) => void;
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
  addChild: (id: number, column: TableColumn) => void;
  removeChild: (id: number) => void;
}

export const tableInjectionKey: InjectionKey<TableContext> =
  Symbol('ArcoTable');

export const tableColumnInjectionKey: InjectionKey<TableColumnContext> =
  Symbol('ArcoTableColumn');
