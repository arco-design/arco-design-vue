import { InjectionKey } from 'vue';
import { Size, Status } from '../_utils/constant';
import { ButtonTypes } from './constants';

export interface ButtonGroupContext {
  size: Size | undefined;
  status: Status | undefined;
  type: ButtonTypes | undefined;
  disabled: boolean;
  shape: 'square' | 'round' | 'circle' | undefined;
}

export const buttonGroupInjectionKey: InjectionKey<ButtonGroupContext> =
  Symbol('ArcoButtonGroup');
