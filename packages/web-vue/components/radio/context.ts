import type { InjectionKey, Slots } from 'vue';
import type { Size } from '../_utils/constant';

export const RADIO_TYPES = ['radio', 'button'] as const;
export type RadioType = typeof RADIO_TYPES[number];

export interface RadioGroupContext {
  name: 'ArcoRadioGroup';
  value: string | number | boolean;
  size: Size;
  type: RadioType;
  disabled: boolean;
  slots: Slots;
  handleChange: (value: string | number | boolean, e: Event) => void;
}

export const radioGroupKey: InjectionKey<RadioGroupContext> =
  Symbol('RadioGroup');
