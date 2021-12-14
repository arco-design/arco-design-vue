import { Slot, Slots } from 'vue';
import { TriggerEvent, TriggerPosition } from '../_utils/constant';

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
