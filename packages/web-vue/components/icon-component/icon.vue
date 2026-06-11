<template>
  <svg :class="cls" :style="innerStyle" fill="currentColor">
    <slot />
  </svg>
</template>

<script setup lang="ts">
  import { computed, CSSProperties } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import { isNumber } from '../_utils/is';

  defineOptions({ name: 'Icon' });

  const props = defineProps({
    type: String,
    size: [Number, String],
    rotate: Number,
    spin: Boolean,
  });

  const prefixCls = getPrefixCls('icon');

  const innerStyle = computed(() => {
    const styles: CSSProperties = {};
    if (props.size) {
      styles.fontSize = isNumber(props.size) ? `${props.size}px` : props.size;
    }
    if (props.rotate) {
      styles.transform = `rotate(${props.rotate}deg)`;
    }
    return styles;
  });

  const cls = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-loading`]: props.spin,
    },
    props.type,
  ]);
</script>
