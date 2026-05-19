import { computed, getCurrentInstance, inject, Ref } from 'vue';

import { ConfigProvider, configProviderInjectionKey } from '../config-provider/context';

interface UseConfigProviderPropOptions<T> {
  propNames: readonly string[];
  getGlobalValue: (configProviderCtx: ConfigProvider | undefined) => T | undefined;
}

export const useConfigProviderProp = <T>(
  propValue: Ref<T | undefined>,
  options: UseConfigProviderPropOptions<T>,
) => {
  const instance = getCurrentInstance();
  const configProviderCtx = inject(configProviderInjectionKey, undefined);

  const hasLocalProp = computed(() => {
    const rawProps = instance?.vnode.props;

    if (!rawProps) {
      return false;
    }

    return options.propNames.some((propName) => Object.hasOwn(rawProps, propName));
  });

  const mergedValue = computed<T | undefined>(() => {
    if (hasLocalProp.value) {
      return propValue.value;
    }

    return options.getGlobalValue(configProviderCtx) ?? propValue.value;
  });

  return {
    mergedValue,
  };
};
