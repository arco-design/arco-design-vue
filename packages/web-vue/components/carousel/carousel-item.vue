<template>
  <div :aria-hidden="!isCurrent" :class="cls" :style="animationStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, computed } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { carouselInjectionKey, CarouselContext } from './context';

export default defineComponent({
  name: 'CarouselItem',
  setup() {
    const prefixCls = getPrefixCls('carousel-item');
    const instance = getCurrentInstance();
    const context = inject<Partial<CarouselContext>>(carouselInjectionKey, {});
    const index = computed(
      () => context.items?.indexOf(instance?.uid ?? -1) ?? -1
    );
    const isCurrent = computed(
      () => context.mergedIndexes?.mergedIndex === index.value
    );
    const cls = computed(() => {
      const { previousIndex, animationName, slideDirection, mergedIndexes } =
        context;
      return {
        [`${prefixCls}-prev`]: index.value === mergedIndexes?.mergedPrevIndex,
        [`${prefixCls}-next`]: index.value === mergedIndexes?.mergedNextIndex,
        [`${prefixCls}-current`]: isCurrent.value,
        [`${prefixCls}-slide-in`]:
          animationName === 'slide' && slideDirection && isCurrent.value,
        [`${prefixCls}-slide-out`]:
          animationName === 'slide' &&
          slideDirection &&
          index.value === previousIndex,
      };
    });
    const animationStyle = computed(() => {
      const { transitionTimingFunction, moveSpeed } = context;
      return {
        transitionTimingFunction,
        transitionDuration: `${moveSpeed}ms`,
        animationTimingFunction: transitionTimingFunction,
        animationDuration: `${moveSpeed}ms`,
      };
    });
    return {
      cls,
      animationStyle,
      isCurrent,
    };
  },
});
</script>
