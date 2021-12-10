import type { InjectionKey } from 'vue';

export interface CollapseContext {
  activeKeys: (string | number)[];
  expandIconPosition: string;
  handleClick: (key: string | number, e: MouseEvent) => void;
}

export const collapseKey: InjectionKey<CollapseContext> = Symbol('collapseCtx');
