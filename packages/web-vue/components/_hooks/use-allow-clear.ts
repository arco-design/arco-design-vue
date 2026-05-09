import { computed, getCurrentInstance, inject, Ref } from 'vue';

import { configProviderInjectionKey } from '../config-provider/context';

const ALLOW_CLEAR_PROP_NAMES = ['allowClear', 'allow-clear'] as const;

export const useAllowClear = (
  allowClear?: Ref<boolean | undefined>,
  extraPropNames: readonly string[] = [],
) => {
  const instance = getCurrentInstance();
  const configProviderCtx = inject(configProviderInjectionKey, undefined);

  const hasAllowClearProp = computed(() => {
    const rawProps = instance?.vnode.props;

    if (!rawProps) {
      return false;
    }

    return [...ALLOW_CLEAR_PROP_NAMES, ...extraPropNames].some((propName) =>
      Object.hasOwn(rawProps, propName),
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
