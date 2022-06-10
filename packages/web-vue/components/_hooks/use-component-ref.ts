import { ComponentPublicInstance, computed, ref } from 'vue';
import { isComponentInstance } from '../_utils/is';

export const useComponentRef = (name: string) => {
  const componentRef = ref<HTMLElement | ComponentPublicInstance>();
  const elementRef = computed(() => {
    if (isComponentInstance(componentRef.value)) {
      return componentRef.value.$refs[name] as HTMLElement;
    }
    return componentRef.value;
  });

  return {
    componentRef,
    elementRef,
  };
};
