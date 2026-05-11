import { computed, Slots } from 'vue';

export default function usePropOrSlot<T extends Record<string, unknown>>(
  props: T,
  slots: Slots,
  propName: keyof T & string,
) {
  return computed(() => props[propName] || (slots[propName] && slots[propName]!()));
}

export function hasPropOrSlot<T extends Record<string, unknown>>(
  props: T,
  slots: Slots,
  propName: keyof T & string,
) {
  return computed(() => Boolean(props[propName] || slots[propName]));
}
