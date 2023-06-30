import { InjectionKey, Slots } from 'vue';
import { ArcoLang } from '../locale/interface';
import { Size } from '../_utils/constant';

export interface ConfigProvider {
  slots: Slots;
  prefixCls?: string;
  locale?: ArcoLang;
  size?: Size;
  updateAtScroll?: boolean;
  scrollToClose?: boolean;
  exchangeTime?: boolean;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider> =
  Symbol('ArcoConfigProvider');
