import type { InjectionKey, Slots } from 'vue';

export interface CollapseContext {
  activeKeys: (string | number)[];
  slots: Slots;
  showExpandIcon?: boolean;
  expandIconPosition: string;
  destroyOnHide: boolean;
  handleClick: (key: string | number, e: MouseEvent) => void;
}

export const collapseKey: InjectionKey<CollapseContext> = Symbol('collapseCtx');
