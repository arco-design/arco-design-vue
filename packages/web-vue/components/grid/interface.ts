import { RendererElement, RendererNode, VNode } from 'vue';

export type GridRowGutter =
  | number
  | Partial<Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', number>>;

export type FlexType = number | string | 'initial' | 'auto' | 'none';

export interface BaseGridProps {
  cols: number;
  rowGap: number;
  colGap: number;
  collapsed: boolean;
  collapsedRows: number;
}

export type GridProps = BaseGridProps;

export interface GridItemProps {
  span: number;
  offset: number;
  suffix: boolean;
}

export type GridItemVNode = VNode<RendererNode, RendererElement, GridItemProps>;

export interface BaseGridItemProps extends GridItemProps {
  cols: number;
  colGap: number;
  overflow: boolean;
}
export interface GridItemData extends GridItemProps {
  node: GridItemVNode;
  visible?: boolean;
}
