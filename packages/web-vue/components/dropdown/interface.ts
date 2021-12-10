import { RenderFunction, Slot } from 'vue';

export interface DOption {
  value: string | number;
  render: RenderFunction;
  disabled?: boolean;

  _props?: Record<string, any>;
}

export interface DGroup {
  isGroup: true;
  render: RenderFunction;

  _props?: Record<string, any>;
}

export interface DSubmenu extends DOption {
  isSubmenu: true;
  children: DropdownOption[];
  footer?: Slot;

  _props?: Record<string, any>;
}

export type DropdownOption = DOption | DGroup | DSubmenu;
