import type { InjectionKey } from 'vue';

export interface DropdownContext {
  onClickOption: (value: string | number) => void;
}

export const dropdownKey: InjectionKey<DropdownContext> =
  Symbol('ArcoDropdown');
