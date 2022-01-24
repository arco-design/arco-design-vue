<template>
  <svg :class="cls" :style="sizeStyle" fill="currentColor">
    <slot />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber } from '../_utils/is';

export default defineComponent({
  name: 'Icon',
  props: {
    type: String,
    size: [Number, String],
    spin: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('icon');

    const sizeStyle = computed(() => {
      if (props.size) {
        return {
          fontSize: isNumber(props.size) ? `${props.size}px` : props.size,
        };
      }
      return undefined;
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
      sizeStyle,
    };
  },
});
</script>
