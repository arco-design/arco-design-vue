import { InjectionKey, Ref, Slots } from 'vue';

import { Size } from '../_utils/constant';
import { SDLang } from '../locale/interface';
import { SDThemeNormalized } from './theme';

export interface ConfigProvider {
  slots: Slots;
  prefixCls?: string;
  locale?: SDLang;
  size?: Size;
  allowClear?: boolean;
  updateAtScroll?: boolean;
  scrollToClose?: boolean;
  exchangeTime?: boolean;
  rtl?: boolean;
  theme?: SDThemeNormalized;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider> = Symbol('SDConfigProvider');

export const themePopupContainerInjectionKey: InjectionKey<Ref<HTMLElement | null>> =
  Symbol('SDThemePopupContainer');
