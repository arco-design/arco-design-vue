<template>
  <div :class="cls" v-bind="eventHandlers">
    <span
      v-if="type === 'slider'"
      :style="sliderStyle"
      :class="[`${prefixCls}-item`, `${prefixCls}-item-active`]"
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
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type {
  CarouselIndicatorPosition,
  CarouselIndicatorType,
  CarouselTriggerEvent,
} from './interface';

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
      type: String as PropType<CarouselIndicatorType>,
      default: 'line',
    },
    position: {
      type: String as PropType<CarouselIndicatorPosition>,
      default: 'bottom',
    },
    trigger: {
      type: String as PropType<CarouselTriggerEvent>,
      default: 'click',
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('carousel-indicator');

    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      if (props.type === 'slider') {
        const x = event.offsetX;
        const width = (event.currentTarget as HTMLElement).clientWidth;
        if (event.target === event.currentTarget) {
          const index = Math.floor((x / width) * props.count);
          index !== props.activeIndex && emit('select', index);
        }
      } else {
        const index = Number.parseInt(
          (event.target as HTMLElement).getAttribute('data-index') ?? '',
          10
        );
        if (!Number.isNaN(index) && index !== props.activeIndex) {
          emit('select', index);
        }
      }
    };

    const eventHandlers = computed(() => {
      return props.trigger === 'click' ? { onClick } : { onMouseover: onClick };
    });

    const cls = computed(() => [
      `${prefixCls}`,
      `${prefixCls}-${props.type}`,
      `${prefixCls}-${props.position}`,
    ]);

    const sliderStyle = computed(() => {
      const step = 100 / props.count;
      return { width: `${step}%`, left: `${props.activeIndex * step}%` };
    });

    return {
      prefixCls,
      eventHandlers,
      cls,
      sliderStyle,
    };
  },
});
</script>
