import { inject } from 'vue';
import { PickerContext, PickerInjectionKey } from '../context';

export default function useDatePickerTransform() {
  const { datePickerT } = inject<PickerContext>(PickerInjectionKey) || {};

  // eslint-disable-next-line
  return datePickerT || ((key: string, ...args: any[]) => key);
}
