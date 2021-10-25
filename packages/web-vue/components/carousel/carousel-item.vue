<template>
  <div :class="cls" :style="animationStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  inject,
  computed,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { carouselInjectionKey, CarouselContext } from './context';

export default defineComponent({
  name: 'CarouselItem',
  setup() {
    const prefixCls = getPrefixCls('carousel-item');
    const instance = getCurrentInstance();
    const instanceId = instance!.uid;
    const context = inject<CarouselContext>(carouselInjectionKey);
    onMounted(() => {
      if (context?.addItem) {
        context.addItem({
          uid: instanceId,
        });
      }
    });
    onUnmounted(() => {
      if (context?.removeItem) {
        context.removeItem(instanceId);
      }
    });
    const myIndexRef = computed(() => {
      const items = context?.items || [];
      const index = items.findIndex((it) => it.uid === instanceId);
      return index;
    });
    const cls = computed(() => {
      const { previousIndex, animationName, slideDirection, mergedIndexes } =
        context!;
      const index = myIndexRef.value;
      const { mergedPrevIndex, mergedNextIndex, mergedIndex } = mergedIndexes;
      return {
        [`${prefixCls}-prev`]: index === mergedPrevIndex,
        [`${prefixCls}-next`]: index === mergedNextIndex,
        [`${prefixCls}-current`]: index === mergedIndex,
        [`${prefixCls}-slide-in`]:
          animationName === 'slide' && slideDirection && index === mergedIndex,
        [`${prefixCls}-slide-out`]:
          animationName === 'slide' &&
          slideDirection &&
          index === previousIndex,
      };
    });
    const animationStyle = computed(() => {
      const { transitionTimingFunction, moveSpeed } = context!;
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
    };
  },
});
</script>
