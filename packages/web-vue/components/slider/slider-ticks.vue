<template>
  <div :class="`${prefixCls}-ticks`">
    <div
      v-for="(item, index) of steps"
      :key="index"
      :class="[
        `${prefixCls}-tick`,
        { [`${prefixCls}-tick-active`]: item.isActive },
      ]"
      :style="getStyle(item.key)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import NP from 'number-precision';
import { getPrefixCls } from '../_utils/global-config';
import { getOffsetPercent, getPositionStyle } from './utils';
import { Direction } from '../_utils/constant';

export default defineComponent({
  name: 'SliderTicks',
  props: {
    value: {
      type: Array as PropType<[number, number]>,
      required: true,
    },
    step: {
      type: Number,
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
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('slider');

    const steps = computed(() => {
      const steps: Array<{ key: number; isActive: boolean }> = [];
      const stepsLength = Math.floor((props.max - props.min) / props.step);
      for (let i = 0; i <= stepsLength; i++) {
        const stepVal = NP.plus(i * props.step, props.min);
        // eslint-disable-next-line no-continue
        if (stepVal <= props.min || stepVal >= props.max) continue;
        steps.push({
          key: stepVal,
          isActive: stepVal >= props.value[0] && stepVal <= props.value[1],
        });
      }
      return steps;
    });

    const getStyle = (value: number) =>
      getPositionStyle(
        getOffsetPercent(value, [props.min, props.max]),
        props.direction
      );

    return {
      prefixCls,
      steps,
      getStyle,
    };
  },
});
</script>
