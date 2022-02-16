import { InjectionKey } from 'vue';
import { GridItemData } from './interface';

export type RowContextContext = Readonly<{
  gutter?: [number, number];
  div?: boolean;
}>;

export const RowContextInjectionKey: InjectionKey<RowContextContext> = Symbol(
  'RowContextInjectionKey'
);

export type GridContext = Readonly<{
  overflow: boolean;
  displayIndexList: number[];
  cols: number;
  colGap: number;
}>;

export const GridContextInjectionKey: InjectionKey<GridContext> = Symbol(
  'GridContextInjectionKey'
);

export type GridDataCollector = Readonly<{
  collectItemData: (index: number, itemData: GridItemData) => void;
  removeItemData: (index: number) => void;
}>;

export const GridDataCollectorInjectionKey: InjectionKey<GridDataCollector> =
  Symbol('GridDataCollectorInjectionKey');
