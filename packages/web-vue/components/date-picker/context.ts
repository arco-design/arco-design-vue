import { InjectionKey } from 'vue';

export const PickerInjectionKey: InjectionKey<string> =
  Symbol('PickerInjectionKey');

export type PickerContext = Readonly<{
  datePickerT: (key: string, ...args: any[]) => any;
}>;
