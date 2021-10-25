import type { InjectionKey } from 'vue';

export interface CollapseContext {
  activeKeys: string[];
  expandIconPosition: string;
  handleClick: (key: string, e: MouseEvent) => void;
}

export const collapseKey: InjectionKey<CollapseContext> = Symbol('collapseCtx');
