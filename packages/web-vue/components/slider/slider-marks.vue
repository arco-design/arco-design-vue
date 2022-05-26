<template>
  <div :class="`${prefixCls}-marks`">
    <div
      v-for="(item, index) of data"
      :key="index"
      aria-hidden="true"
      :class="`${prefixCls}-mark`"
      :style="getStyle(item.key)"
    >
      {{ item.content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { getOffsetPercent, getPositionStyle } from './utils';
import { DIRECTIONS } from '../_utils/constant';

export default defineComponent({
  name: 'SliderMarks',
  props: {
    data: {
      type: Array as PropType<Array<{ key: number; content: string }>>,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    direction: {
      type: String as PropType<typeof DIRECTIONS[number]>,
      default: 'horizontal',
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('slider');

    const getStyle = (value: number) =>
      getPositionStyle(
        getOffsetPercent(value, [props.min, props.max]),
        props.direction
      );

    return {
      prefixCls,
      getStyle,
    };
  },
});
</script>
