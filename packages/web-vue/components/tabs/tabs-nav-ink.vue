<template>
  <div :class="cls" :style="style" />
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  nextTick,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { Direction } from '../_utils/constant';

export default defineComponent({
  name: 'TabsNavInk',
  props: {
    activeTabRef: {
      type: Object as PropType<HTMLElement>,
      required: true,
    },
    direction: {
      type: String as PropType<Direction>,
      required: true,
    },
    disabled: Boolean,
    animation: Boolean,
  },
  setup(props) {
    const { activeTabRef, direction } = toRefs(props);
    const prefixCls = getPrefixCls('tabs-nav-ink');

    const style = ref<CSSProperties>({});

    watch(
      [activeTabRef, direction],
      ([tabRef, direction]) => {
        nextTick(() => {
          if (direction === 'vertical') {
            style.value = {
              top: `${tabRef.offsetTop}px`,
              height: `${tabRef.offsetHeight}px`,
            };
          } else {
            style.value = {
              left: `${tabRef.offsetLeft}px`,
              width: `${tabRef.offsetWidth}px`,
            };
          }
        });
      },
      { immediate: true }
    );

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-animation`]: props.animation,
        [`${prefixCls}-disabled`]: props.disabled,
      },
    ]);

    return {
      prefixCls,
      cls,
      style,
    };
  },
});
</script>
