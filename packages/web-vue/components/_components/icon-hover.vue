<template>
  <span
    :class="[
      prefixCls,
      {
        [`${prefix}-icon-hover`]: prefix,
        [`${prefixCls}-size-${size}`]: size !== 'medium',
        [`${prefixCls}-disabled`]: disabled,
      },
    ]"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { Size } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'IconHover',
  props: {
    prefix: {
      type: String,
    },
    size: {
      type: String as PropType<Size>,
      default: 'medium',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const prefixCls = getPrefixCls('icon-hover');

    return {
      prefixCls,
    };
  },
});
</script>
