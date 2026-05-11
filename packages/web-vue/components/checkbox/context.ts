import type { InjectionKey, Slots } from 'vue';

export interface CheckboxGroupContext {
  name: 'SDCheckboxGroup';
  computedValue: Array<string | number | boolean>;
  disabled: boolean;
  isMaxed: boolean;
  slots: Slots;
  handleChange: (value: Array<string | number | boolean>, e: Event) => void;
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('SDCheckboxGroup');
