import { InjectionKey, Slots } from 'vue';
import { ArcoLang } from '../locale/interface';
import { Size } from '../_utils/constant';

export interface ConfigProvider {
  prefixCls?: string;
  locale?: ArcoLang;
  size?: Size;
  slots: Slots;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider> =
  Symbol('ArcoConfigProvider');
