export type GridRowGutter =
  | number
  | Partial<Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', number>>;

export type FlexType = number | string | 'initial' | 'auto' | 'none';

export interface GridProps {
  cols: number;
  rowGap: number;
  colGap: number;
  collapsed: boolean;
  collapsedRows: number;
}

export interface GridItemProps {
  span: number;
  offset: number;
  suffix: boolean;
}

export type GridItemData = GridItemProps;
