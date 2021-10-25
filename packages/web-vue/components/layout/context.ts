import { InjectionKey } from 'vue';

export interface LayoutSiderContext {
  onSiderMount?: (id: string) => void;
  onSiderUnMount?: (id: string) => void;
}

export const LayoutSiderInjectionKey: InjectionKey<LayoutSiderContext> = Symbol(
  'LayoutSiderInjectionKey'
);

export interface SiderContext {
  theme: string;
  collapsed: boolean;
  collapsedWidth: string | number;
}

export const SiderInjectionKey: InjectionKey<SiderContext> =
  Symbol('SiderInjectionKey');
