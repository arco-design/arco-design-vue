import type { RenderFunction } from 'vue';

export type TabsPosition = 'left' | 'right' | 'top' | 'bottom';

export type TabsType =
  | 'line'
  | 'card'
  | 'card-gutter'
  | 'text'
  | 'rounded'
  | 'capsule';

export interface TabData {
  index: number;
  key: string | number;
  title: RenderFunction;
  disabled?: boolean;
  closable?: boolean;
}
