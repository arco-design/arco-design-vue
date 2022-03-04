import type { InjectionKey, Slots } from 'vue';
import { TableData } from './interface';

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
}

export const tableInjectionKey: InjectionKey<TableContext> =
  Symbol('ArcoTable');
