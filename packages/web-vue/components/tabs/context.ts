import { InjectionKey } from 'vue';
import { TabData } from './interface';

export interface TabsContext {
  lazyLoad: boolean;
  activeKey: string | number;
  addItem: (id: number, data: TabData) => void;
  removeItem: (id: number) => void;
}

export const tabsInjectionKey: InjectionKey<TabsContext> = Symbol('ArcoTabs');
