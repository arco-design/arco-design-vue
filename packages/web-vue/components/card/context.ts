import { InjectionKey } from 'vue';

export interface CardContext {
  hasMeta: boolean;
  hasGrid: boolean;
  actions: JSX.Element | null;
}

export const cardInjectionKey: InjectionKey<CardContext> = Symbol('ArcoCard');
