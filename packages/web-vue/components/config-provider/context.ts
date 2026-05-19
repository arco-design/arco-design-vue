import { CSSProperties, InjectionKey, Ref, Slots } from 'vue';

import { VirtualListProps } from '../_components/virtual-list/interface';
import { Size } from '../_utils/constant';
import { ButtonProps } from '../button';
import { ShortcutType, WeekStart } from '../date-picker/interface';
import { SDLang } from '../locale/interface';
import { SDThemeNormalized } from './theme';

export interface ConfigProviderModal {
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  alignCenter?: boolean;
  escToClose?: boolean;
  draggable?: boolean;
  closable?: boolean;
  titleAlign?: 'start' | 'center';
  top?: number | string;
  footer?: boolean;
  hideCancel?: boolean;
  okText?: string;
  cancelText?: string;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  width?: number | string;
}

export interface ConfigProviderDrawer {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  mask?: boolean;
  maskClosable?: boolean;
  escToClose?: boolean;
  closable?: boolean;
  header?: boolean;
  footer?: boolean;
  hideCancel?: boolean;
  okText?: string;
  cancelText?: string;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  width?: number | string;
  height?: number | string;
}

export interface ConfigProviderDatePicker {
  shortcuts?: ShortcutType[];
  shortcutsPosition?: 'left' | 'bottom' | 'right';
  previewShortcut?: boolean;
  showConfirmBtn?: boolean;
  showNowBtn?: boolean;
  dayStartOfWeek?: WeekStart;
  abbreviation?: boolean;
}

export interface ConfigProvider {
  slots: Slots;
  prefixCls?: string;
  locale?: SDLang;
  size?: Size;
  allowClear?: boolean;
  allowSearch?: boolean;
  virtualListProps?: VirtualListProps;
  updateAtScroll?: boolean;
  scrollToClose?: boolean;
  exchangeTime?: boolean;
  rtl?: boolean;
  datePicker?: ConfigProviderDatePicker;
  modal?: ConfigProviderModal;
  drawer?: ConfigProviderDrawer;
  theme?: SDThemeNormalized;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider> = Symbol('SDConfigProvider');

export const themePopupContainerInjectionKey: InjectionKey<Ref<HTMLElement | null>> =
  Symbol('SDThemePopupContainer');
