import { InjectionKey } from 'vue';

export interface CollapseContext {
  showNav: boolean;
  showAnchor: boolean;
  toggleNav: () => void;
  toggleAnchor: () => void;
}

export const collapseInjectionKey: InjectionKey<CollapseContext> =
  Symbol('CollapseContext');
