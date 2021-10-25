import { InjectionKey } from 'vue';

export interface ZIndexContext {
  zIndex: number;
}

export const zIndexInjectionKey: InjectionKey<ZIndexContext> =
  Symbol('ArcoZIndex');
