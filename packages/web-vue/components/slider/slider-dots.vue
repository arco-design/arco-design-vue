<template>
  <div :class="`${prefixCls}-dots`">
    <div
      v-for="(item, index) of data"
      :key="index"
      :class="`${prefixCls}-dot-wrapper`"
      :style="getStyle(item.key)"
    >
      <div :class="[`${prefixCls}-dot`, { [`${prefixCls}-dot-active`]: item.isActive }]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  import { DIRECTIONS } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';
  import { getOffsetPercent, getPositionStyle } from './utils';

  defineOptions({ name: 'SliderDots' });

  const props = defineProps({
    data: {
      type: Array as PropType<Array<{ key: number; content: string; isActive: boolean }>>,
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
      type: String as PropType<(typeof DIRECTIONS)[number]>,
      default: 'horizontal',
    },
  });

  const prefixCls = getPrefixCls('slider');

  const getStyle = (value: number) =>
    getPositionStyle(getOffsetPercent(value, [props.min, props.max]), props.direction);
</script>
