import type { InjectionKey, Slot } from 'vue';

export interface TableContext {
  expandedRow: Slot;
  expandIcon: Slot;
}

export const tableInjectionKey: InjectionKey<TableContext> =
  Symbol('ArcoTable');
