import { InjectionKey, Slots, VNode } from 'vue';

export interface CardContext {
  hasMeta: boolean;
  hasGrid: boolean;
  slots: Slots;
  renderActions: (vns: VNode[]) => JSX.Element;
}

export const cardInjectionKey: InjectionKey<CardContext> = Symbol('ArcoCard');
