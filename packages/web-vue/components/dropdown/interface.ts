import { Slot, Slots } from 'vue';
import { TriggerEvent, TriggerPosition } from '../_utils/constant';

export type DropdownPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';

export interface DropDownProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerEvent | TriggerEvent[];
  position?: DropdownPosition;
  popupContainer?: string | HTMLElement;
  popupMaxHeight?: boolean | number;
}

export interface DOption {
  value: string | number;
  disabled?: boolean;

  _props?: Record<string, any>;
  _slots?: Slots;
}

export interface DGroup {
  isGroup: true;
  options: DropdownOption[];
  title?: string;

  _props?: Record<string, any>;
  _slots?: Slots;
}

export interface DSubmenu extends DOption {
  isSubmenu: true;
  render: Slot;
  children: DropdownOption[];
  trigger?: TriggerEvent;
  position?: TriggerPosition;
  footer?: Slot;
}

export type DropdownOption = DOption | DGroup | DSubmenu;
