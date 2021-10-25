<template>
  <ul v-for="(style, index) of lines" :key="index" :class="prefixCls">
    <li :class="`${prefixCls}-row`" :style="style" />
  </ul>
</template>

<script lang="ts">
import type { PropType, CSSProperties } from 'vue';
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber, isString } from '../_utils/is';

export default defineComponent({
  name: 'SkeletonLine',
  props: {
    /**
     * @zh 展示的行数
     * @en Number of rows displayed
     */
    rows: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 线型骨架的宽度
     * @en The width of the line skeleton
     */
    widths: {
      type: Array as PropType<Array<number | string>>,
      default: () => [],
    },
    /**
     * @zh 线型骨架的行高
     * @en Line height of the line skeleton
     */
    lineHeight: {
      type: Number,
      default: 20,
    },
    /**
     * @zh 线型骨架的行间距
     * @en Line spacing of line skeleton
     */
    lineSpacing: {
      type: Number,
      default: 15,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('skeleton-line');

    const lines: CSSProperties[] = [];
    for (let i = 0; i < props.rows; i++) {
      const style: CSSProperties = {};
      if (isNumber(props.widths[i])) {
        style.width = `${props.widths[i]}px`;
      } else if (isString(props.widths[i])) {
        style.width = String(props.widths[i]);
      }
      style.height = `${props.lineHeight}px`;
      if (i > 0) {
        style.marginTop = `${props.lineSpacing}px`;
      }
      lines.push(style);
    }

    return {
      prefixCls,
      lines,
    };
  },
});
</script>
