import { computed, inject, Ref } from 'vue';
import { Size } from '../_utils/constant';
import { configProviderInjectionKey } from '../config-provider/context';

export const useSize = (
  size?: Ref<Size | undefined>,
  { defaultValue = 'medium' }: { defaultValue?: Size } = {}
) => {
  const configProviderCtx = inject(configProviderInjectionKey, undefined);

  const mergedSize = computed(
    () => size?.value ?? configProviderCtx?.size ?? defaultValue
  );

  return {
    mergedSize,
  };
};
