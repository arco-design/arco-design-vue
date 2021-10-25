import { computed, ref, toRefs, watchEffect } from 'vue';
import { isNumber } from '../../../_utils/is';

const DEFAULT_HEIGHT = 200;

export function useViewportHeight(props: { height: number | string }) {
  const { height } = toRefs(props);

  const viewportHeight = ref(DEFAULT_HEIGHT);
  const setViewportHeight = (val: number) => {
    viewportHeight.value = val;
  };

  watchEffect(() => {
    if (isNumber(height.value)) {
      viewportHeight.value = height.value;
    }
  });

  return {
    viewportHeight,
    setViewportHeight,
    needMeasureViewportHeight: computed(() => !isNumber(height.value)),
  };
}
