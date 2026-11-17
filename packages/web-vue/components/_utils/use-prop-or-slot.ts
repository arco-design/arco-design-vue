import { computed, Slots } from 'vue';

export default function usePropOrSlot<T = { [key: string]: any }>(
  props: T,
  slots: Slots,
  propName: string
) {
  return computed(
    () =>
      (props as Record<string, any>)[propName] ||
      (slots[propName] && slots[propName]!())
  );
}

export function hasPropOrSlot<T = { [key: string]: any }>(
  props: T,
  slots: Slots,
  propName: string
) {
  return computed(() =>
    Boolean((props as Record<string, any>)[propName] || slots[propName])
  );
}
