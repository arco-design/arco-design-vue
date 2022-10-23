<template>
  <svg :class="cls" :style="innerStyle" fill="currentColor">
    <slot />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, CSSProperties } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber } from '../_utils/is';

export default defineComponent({
  name: 'Icon',
  props: {
    type: String,
    size: [Number, String],
    rotate: Number,
    spin: Boolean,
  },
  setup(props) {
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

    return {
      cls,
      innerStyle,
    };
  },
});
</script>
