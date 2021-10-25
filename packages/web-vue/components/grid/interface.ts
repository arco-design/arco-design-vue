import { ScreenMap } from '../_utils/responsive-observe';

export type GridRowGutter =
  | number
  | Partial<Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', number>>;

export interface RowContextState {
  gutter?: [number, number];
  div?: boolean;
}

export interface RowState {
  screens: ScreenMap;
}
