import { computed, getCurrentInstance, inject, Ref } from 'vue';

import { configProviderInjectionKey } from '../config-provider/context';

const ALLOW_CLEAR_PROP_NAMES = ['allowClear', 'allow-clear'] as const;

export const useAllowClear = (allowClear?: Ref<boolean | undefined>) => {
  const instance = getCurrentInstance();
  const configProviderCtx = inject(configProviderInjectionKey, undefined);

  const hasAllowClearProp = computed(() => {
    const rawProps = instance?.vnode.props;

    if (!rawProps) {
      return false;
    }

    return ALLOW_CLEAR_PROP_NAMES.some((propName) =>
      Object.prototype.hasOwnProperty.call(rawProps, propName),
    );
  });

  const mergedAllowClear = computed(() => {
    if (hasAllowClearProp.value) {
      return allowClear?.value;
    }

    if (configProviderCtx?.allowClear === true) {
      return true;
    }

    return allowClear?.value;
  });

  return {
    mergedAllowClear,
  };
};
