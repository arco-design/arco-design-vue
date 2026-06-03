import { computed, Ref } from 'vue';

import { isBoolean } from '../_utils/is';
import { ScrollbarProps } from '../scrollbar';

export const useScrollbar = (scrollbar: Ref<ScrollbarProps | boolean | undefined>) => {
  const scrollbarProps = computed<ScrollbarProps>(() => {
    return {
      type: 'embed',
      ...(isBoolean(scrollbar.value) ? undefined : scrollbar.value),
    };
  });

  return {
    scrollbarProps,
  };
};
