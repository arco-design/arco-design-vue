<template>
  <transition>
    <div
      ref="trackRef"
      :class="[
        `${prefixCls}-track`,
        `${prefixCls}-track-direction-${direction}`,
      ]"
      @mousedown.self="handleTrackClick"
    >
      <div
        ref="thumbRef"
        :class="thumbCls"
        :style="thumbStyle"
        @mousedown="handleThumbMouseDown"
      >
        <div :class="`${prefixCls}-thumb-bar`" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { off, on } from '../_utils/dom';
import { ThumbData, ThumbMap } from './interface';
import { getPrefixCls } from '../_utils/global-config';
import { Direction } from '../_utils/constant';

export default defineComponent({
  name: 'Thumb',
  props: {
    data: {
      type: Object as PropType<ThumbData>,
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
    both: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('scrollbar');

    const visible = ref(false);
    const trackRef = ref<HTMLElement>();
    const thumbRef = ref<HTMLElement>();

    const thumbMap = computed<ThumbMap>(() => {
      if (props.direction === 'horizontal') {
        return {
          size: 'width',
          direction: 'left',
          offset: 'offsetWidth',
          client: 'clientX',
        };
      }
      return {
        size: 'height',
        direction: 'top',
        offset: 'offsetHeight',
        client: 'clientY',
      };
    });

    const offset = ref(0);

    const isDragging = ref(false);
    const mouseOffset = ref(0);

    const thumbStyle = computed(() => {
      return {
        [thumbMap.value.size]: `${props.data?.thumbSize ?? 0}px`,
        [thumbMap.value.direction]: `${offset.value}px`,
      };
    });

    const handleThumbMouseDown = (ev: MouseEvent) => {
      ev.preventDefault();

      if (thumbRef.value) {
        mouseOffset.value =
          ev[thumbMap.value.client] -
          thumbRef.value.getBoundingClientRect()[thumbMap.value.direction];
        isDragging.value = true;
        on(window, 'mousemove', handleMouseMove);
        on(window, 'mouseup', handleMouseUp);
        on(window, 'contextmenu', handleMouseUp);
      }
    };

    const handleTrackClick = (ev: MouseEvent) => {
      ev.preventDefault();

      if (thumbRef.value) {
        const _offset = getLegalOffset(
          ev[thumbMap.value.client] >
            thumbRef.value.getBoundingClientRect()[thumbMap.value.direction]
            ? offset.value + (props.data?.thumbSize ?? 0)
            : offset.value - (props.data?.thumbSize ?? 0)
        );
        if (_offset !== offset.value) {
          offset.value = _offset;
          emit('scroll', _offset);
        }
      }
    };

    const getLegalOffset = (offset: number) => {
      if (offset < 0) {
        return 0;
      }
      if (props.data && offset > props.data.max) {
        return props.data.max;
      }
      return offset;
    };

    const handleMouseMove = (ev: MouseEvent) => {
      if (trackRef.value && thumbRef.value) {
        const _offset = getLegalOffset(
          ev[thumbMap.value.client] -
            trackRef.value.getBoundingClientRect()[thumbMap.value.direction] -
            mouseOffset.value
        );
        if (_offset !== offset.value) {
          offset.value = _offset;
          emit('scroll', _offset);
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.value = false;
      off(window, 'mousemove', handleMouseMove);
      off(window, 'mouseup', handleMouseUp);
    };

    const setOffset = (_offset: number) => {
      if (!isDragging.value) {
        _offset = getLegalOffset(_offset);
        if (_offset !== offset.value) {
          offset.value = _offset;
        }
      }
    };

    const thumbCls = computed(() => [
      `${prefixCls}-thumb`,
      `${prefixCls}-thumb-direction-${props.direction}`,
      {
        [`${prefixCls}-thumb-dragging`]: isDragging.value,
      },
    ]);

    return {
      visible,
      trackRef,
      thumbRef,
      prefixCls,
      thumbCls,
      thumbStyle,
      handleThumbMouseDown,
      handleTrackClick,
      setOffset,
    };
  },
});
</script>
