import type { InjectionKey } from 'vue';

export interface CheckboxGroupContext {
  name: 'ArcoCheckboxGroup';
  computedValue: Array<string | number>;
  disabled: boolean;
  handleChange: (value: Array<string | number | boolean>, e: Event) => void;
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> =
  Symbol('ArcoCheckboxGroup');
