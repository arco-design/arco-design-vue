import { ComponentPublicInstance, onMounted, ref, watch } from 'vue';
import { isComponentInstance } from '../_utils/is';

export const useComponentRef = (name: string) => {
  const componentRef = ref<HTMLElement | ComponentPublicInstance>();

  const getElement = () => {
    if (isComponentInstance(componentRef.value)) {
      return componentRef.value.$refs[name] as HTMLElement;
    }
    return componentRef.value;
  };

  const elementRef = ref();

  onMounted(() => {
    elementRef.value = getElement();
  });

  watch([componentRef], () => {
    elementRef.value = getElement();
  });

  return {
    componentRef,
    elementRef,
  };
};
