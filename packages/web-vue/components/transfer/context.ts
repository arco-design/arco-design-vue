import { InjectionKey, Slot } from 'vue';

export interface TransferContext {
  itemSlot: Slot;
  selected: string[];
  moveTo: (values: string[], target: 'target' | 'source') => void;
}

export const transferInjectionKey: InjectionKey<TransferContext> =
  Symbol('ArcoTransfer');
