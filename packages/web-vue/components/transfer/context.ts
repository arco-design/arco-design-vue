import { InjectionKey, Slots } from 'vue';

export interface TransferContext {
  selected: string[];
  slots: Slots;
  moveTo: (values: string[], target: 'target' | 'source') => void;
  onSelect: (value: string[]) => void;
}

export const transferInjectionKey: InjectionKey<TransferContext> =
  Symbol('ArcoTransfer');
