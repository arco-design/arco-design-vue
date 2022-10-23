import type { InjectionKey, Slots } from 'vue';
import { BaseType } from '../_utils/types';
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
  currentAllEnabledRowKeys: BaseType[];
  currentSelectedRowKeys: BaseType[];
  checkStrictly: boolean;
  filters: Filters;
  filterIconAlignLeft: boolean;
  resizingColumn: string;
  addColumn: (id: number, column: TableColumnData) => void;
  removeColumn: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  onSelect: (checked: boolean, record: TableDataWithRaw) => void;
  onSelectAllLeafs: (record: TableDataWithRaw, checked: boolean) => void;

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
