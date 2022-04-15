import { InjectionKey } from 'vue';
import { Size, Status } from '../_utils/constant';
import { ButtonTypes } from './constants';

export interface ButtonGroupContext {
  size: Size;
  status: Status;
  type: ButtonTypes;
  disabled: boolean;
  shape: 'square' | 'round' | 'circle';
}

export const buttonGroupInjectionKey: InjectionKey<ButtonGroupContext> =
  Symbol('ArcoButtonGroup');
