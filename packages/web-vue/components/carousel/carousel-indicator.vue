<template>
  <div
    :class="`${prefixCls} ${prefixCls}-${type} ${prefixCls}-${position}`"
    v-on="listeners"
  >
    <span
      v-if="type === 'slider'"
      :style="{ width: `${step}%`, left: `${activeIndex * step}%` }"
      :class="`${prefixCls}-item ${prefixCls}-item-active`"
    />
    <template v-else>
      <span
        v-for="(_, index) in Array(count)"
        :key="index"
        :data-index="index"
        :class="[
          `${prefixCls}-item`,
          { [`${prefixCls}-item-active`]: index === activeIndex },
        ]"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import {
  TRIGGERS,
  TriggerType,
  INDICATORS,
  IndicatorType,
  INDICATORS_POSITION,
  IndicatorPositionType,
} from './constants';

export default defineComponent({
  name: 'Indicator',
  props: {
    count: {
      type: Number,
      default: 2,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    type: {
      type: String as PropType<IndicatorType>,
      validator: (value: IndicatorType) => {
        return INDICATORS.includes(value);
      },
      default: 'line',
    },
    position: {
      type: String as PropType<IndicatorPositionType>,
      validator: (value: IndicatorPositionType) => {
        return INDICATORS_POSITION.includes(value);
      },
      default: 'bottom',
    },
    trigger: {
      type: String as PropType<TriggerType>,
      validator: (value: TriggerType) => {
        return TRIGGERS.includes(value);
      },
      default: 'click',
    },
    onSelectIndex: {
      type: Function,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('carousel-indicator');

    const listeners = computed(() => {
      const { trigger, type, count, onSelectIndex, activeIndex } = props;
      return {
        [trigger === 'click' ? 'click' : 'mouseEnter']: (event: any) => {
          event.preventDefault();
          if (type === 'slider') {
            const x = event.offsetX;
            const width = event.currentTarget.clientWidth;
            if (event.target === event.currentTarget) {
              const index = ~~((x / width) * count);
              index !== activeIndex && onSelectIndex!(index);
            }
          } else {
            const index = +event.target.getAttribute('data-index');
            !Number.isNaN(index) &&
              index !== activeIndex &&
              onSelectIndex!(index);
          }
        },
      };
    });

    const step = computed(() => {
      if (props.type === 'slider') {
        return 100 / props.count;
      }
      return null;
    });

    return {
      prefixCls,
      listeners,
      step,
    };
  },
});
</script>
