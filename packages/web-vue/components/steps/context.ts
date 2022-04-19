import { InjectionKey } from 'vue';
import { StepData, StepStatus, StepsType } from './interface';
import { Direction } from '../_utils/constant';

export interface StepsContext {
  current: number;
  direction: Direction;
  labelPlacement: Direction;
  lineLess: boolean;
  type: StepsType;
  errorSteps: number[];
  addItem: (step: number, data: StepData) => void;
  removeItem: (step: number) => void;
  getStatus: (step: number) => StepStatus;
  onClick: (step: number, ev: Event) => void;
  parentCls: string;
}

export const stepsInjectionKey: InjectionKey<StepsContext> =
  Symbol('ArcoSteps');
