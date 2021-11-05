<template>
  <tooltip
    :popup-visible="isDragging ? true : undefined"
    :position="mergedTooltipPosition"
    :content="tooltipContent"
  >
    <div
      v-bind="$attrs"
      :class="cls"
      @mousedown="handleMouseDown"
      @click.stop
    />
  </tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Tooltip from '../tooltip';
import { off, on } from '../_utils/dom';
import { DIRECTIONS } from '../_utils/constant';

export default defineComponent({
  name: 'SliderButton',
  components: {
    Tooltip,
  },
  inheritAttrs: false,
  props: {
    direction: {
      type: String as PropType<typeof DIRECTIONS[number]>,
      default: 'horizontal',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    formatTooltip: {
      type: Function,
    },
    value: [String, Number],
    tooltipPosition: {
      type: String,
    },
  },
  emits: ['movestart', 'moving', 'moveend'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('slider-btn');
    const isDragging = ref(false);

    const handleMouseDown = (e: MouseEvent) => {
      if (props.disabled) {
        return;
      }

      e.preventDefault();

      isDragging.value = true;
      on(window, 'mousemove', handleMouseMove);
      on(window, 'mouseup', handleMouseUp);
      on(window, 'contextmenu', handleMouseUp);
      emit('movestart');
    };

    const handleMouseMove = (e: MouseEvent) => {
      emit('moving', e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isDragging.value = false;
      off(window, 'mousemove', handleMouseMove);
      off(window, 'mouseup', handleMouseUp);
      emit('moveend');
    };

    const cls = computed(() => [prefixCls]);

    const mergedTooltipPosition = computed(() =>
      props.tooltipPosition ?? props.direction === 'vertical' ? 'right' : 'top'
    );

    const tooltipContent = computed(
      () => props.formatTooltip?.(props.value) ?? `${props.value}`
    );

    return {
      prefixCls,
      cls,
      tooltipContent,
      mergedTooltipPosition,
      isDragging,
      handleMouseDown,
    };
  },
});
</script>
