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

<script setup lang="ts">
  import { PropType } from 'vue';

  import { DIRECTIONS } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';
  import { getOffsetPercent, getPositionStyle } from './utils';

  defineOptions({ name: 'SliderMarks' });

  const props = defineProps({
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
      type: String as PropType<(typeof DIRECTIONS)[number]>,
      default: 'horizontal',
    },
  });

  const prefixCls = getPrefixCls('slider');

  const getStyle = (value: number) =>
    getPositionStyle(getOffsetPercent(value, [props.min, props.max]), props.direction);
</script>
