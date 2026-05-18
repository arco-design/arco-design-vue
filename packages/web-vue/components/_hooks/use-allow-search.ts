import { computed, getCurrentInstance, inject, Ref } from 'vue';

import { configProviderInjectionKey } from '../config-provider/context';

const ALLOW_SEARCH_PROP_NAMES = ['allowSearch', 'allow-search'] as const;

interface UseAllowSearchOptions<T> {
  compatPropNames?: readonly string[];
  getCompatValue?: () => T | undefined;
  getDefaultValue?: () => T | undefined;
}

export const useAllowSearch = <T>(
  allowSearch?: Ref<T | undefined>,
  options: UseAllowSearchOptions<T> = {},
) => {
  const instance = getCurrentInstance();
  const configProviderCtx = inject(configProviderInjectionKey, undefined);

  const hasAllowSearchProp = computed(() => {
    const rawProps = instance?.vnode.props;

    if (!rawProps) {
      return false;
    }

    return ALLOW_SEARCH_PROP_NAMES.some((propName) => Object.hasOwn(rawProps, propName));
  });

  const hasCompatProp = computed(() => {
    const rawProps = instance?.vnode.props;

    if (!rawProps || !options.compatPropNames?.length) {
      return false;
    }

    return options.compatPropNames.some((propName) => Object.hasOwn(rawProps, propName));
  });

  const mergedAllowSearch = computed<T | undefined>(() => {
    if (hasAllowSearchProp.value) {
      return allowSearch?.value;
    }

    if (hasCompatProp.value) {
      return options.getCompatValue?.();
    }

    if (configProviderCtx?.allowSearch === true) {
      return true as T;
    }

    return options.getDefaultValue?.() ?? allowSearch?.value;
  });

  return {
    mergedAllowSearch,
  };
};
