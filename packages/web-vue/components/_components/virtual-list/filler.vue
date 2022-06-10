<template>
  <table
    v-if="type === 'table'"
    :style="outerStyle"
    cellpadding="0"
    cellspacing="0"
    v-bind="outerAttrs"
  >
    <tbody :style="innerStyle" v-bind="innerAttrs">
      <slot />
    </tbody>
  </table>
  <div v-else-if="!disabled" :style="outerStyle" v-bind="outerAttrs">
    <div :style="innerStyle" v-bind="innerAttrs">
      <slot />
    </div>
  </div>
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, CSSProperties } from 'vue';

export default defineComponent({
  name: 'VirtualListFiller',
  props: {
    height: {
      type: Number,
    },
    offset: {
      type: Number,
    },
    disabled: {
      type: Boolean,
    },
    type: String,
    outerAttrs: Object,
    innerAttrs: Object,
  },
  setup(props) {
    const { height, offset } = toRefs(props);

    const outerStyle = computed<CSSProperties>(() =>
      offset.value !== undefined
        ? {
            height: `${height.value}px`,
            position: 'relative',
            zIndex: 0,
          }
        : {}
    );

    const innerStyle = computed<CSSProperties>(() => {
      const commonStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
      };

      return offset.value !== undefined
        ? {
            ...commonStyle,
            transform: `translateY(${offset.value}px)`,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
          }
        : commonStyle;
    });

    return {
      outerStyle,
      innerStyle,
    };
  },
});
</script>
