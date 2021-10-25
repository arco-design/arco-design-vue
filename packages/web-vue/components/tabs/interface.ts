import type { RenderFunction } from 'vue';

export const POSITIONS = ['left', 'right', 'top', 'bottom'] as const;
export type Positions = typeof POSITIONS[number];

export const TYPES = [
  'line',
  'card',
  'card-gutter',
  'text',
  'rounded',
  'capsule',
];
export type Types = typeof TYPES[number];

export interface TabData {
  key: string;
  title: string;
  disabled?: boolean;
  closable?: boolean;
}

export type TabList = Array<{
  key: string;
  title: RenderFunction;
  disabled: boolean;
  closable: boolean;
}>;
