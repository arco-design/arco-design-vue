import type { Slots } from 'vue';

export type TabsPosition = 'left' | 'right' | 'top' | 'bottom';

export type TabsType =
  | 'line'
  | 'card'
  | 'card-gutter'
  | 'text'
  | 'rounded'
  | 'capsule';

export interface TabData {
  key: string | number;
  title?: string;
  disabled?: boolean;
  closable?: boolean;
  slots: Slots;
}

export type TabTriggerEvent = 'click' | 'hover';

export type ScrollPosition = 'start' | 'end' | 'center' | 'auto' | number;
