import { InjectionKey, Slot } from 'vue';
import { ArcoLang } from '../locale/interface';

export interface ConfigProvider {
  prefixCls?: string;
  locale?: ArcoLang;
  emptySlot?: Slot;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider> =
  Symbol('ArcoConfigProvider');
