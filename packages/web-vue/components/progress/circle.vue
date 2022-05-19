<template>
  <div
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="percent"
    :class="`${prefixCls}-wrapper`"
    :style="{ width: `${mergedWidth}px`, height: `${mergedWidth}px` }"
  >
    <icon-check
      v-if="type === 'circle' && size === 'mini' && status === 'success'"
      :style="{ fontSize: mergedWidth - 2, color }"
    />
    <svg
      v-else
      :viewBox="`0 0 ${mergedWidth} ${mergedWidth}`"
      :class="`${prefixCls}-svg`"
    >
      <defs v-if="isLinearGradient">
        <linearGradient :id="linearGradientId" x1="0" y1="1" x2="0" y2="0">
          <stop
            v-for="key of Object.keys(color)"
            :key="key"
            :offset="key"
            :stop-color="color[key]"
          />
        </linearGradient>
      </defs>
      <circle
        :class="`${prefixCls}-bg`"
        fill="none"
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="mergedPathStrokeWidth"
        :style="{
          stroke: trackColor,
        }"
      />
      <circle
        :class="`${prefixCls}-bar`"
        fill="none"
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="mergedStrokeWidth"
        :style="{
          stroke: isLinearGradient ? `url(#${linearGradientId})` : color,
          strokeDasharray: perimeter,
          strokeDashoffset: (percent >= 1 ? 0 : 1 - percent) * perimeter,
        }"
      />
    </svg>
    <div v-if="showText && size !== 'mini'" :class="`${prefixCls}-text`">
      <slot name="text" :percent="percent">
        <icon-exclamation v-if="status === 'danger'" />
        <icon-check v-else-if="status === 'success'" />
        <template v-else>
          {{ text }}
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import NP from 'number-precision';
import { getPrefixCls } from '../_utils/global-config';
import { isObject } from '../_utils/is';
import { SIZES } from '../_utils/constant';
import IconExclamation from '../icon/icon-exclamation';
import IconCheck from '../icon/icon-check';

let __ARCO_PROGRESS_SEED = 0;

const DEFAULT_WIDTH = {
  mini: 16,
  small: 48,
  medium: 64,
  large: 80,
};

const DEFAULT_STROKE_WIDTH = {
  mini: 4,
  small: 3,
  medium: 4,
  large: 4,
};

export default defineComponent({
  name: 'ProgressCircle',
  components: {
    IconExclamation,
    IconCheck,
  },
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
    },
    size: {
      type: String as PropType<typeof SIZES[number]>,
      default: 'medium',
    },
    strokeWidth: {
      type: Number,
    },
    width: {
      type: Number,
      default: undefined,
    },
    color: {
      type: [String, Object],
      default: undefined,
    },
    trackColor: String,
    status: {
      type: String,
      default: undefined,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    pathStrokeWidth: {
      type: Number,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('progress-circle');

    const isLinearGradient = isObject(props.color);

    const mergedWidth = computed(() => {
      return props.width ?? DEFAULT_WIDTH[props.size];
    });

    const mergedStrokeWidth = computed(
      () =>
        props.strokeWidth ??
        (props.size === 'mini'
          ? mergedWidth.value / 2
          : DEFAULT_STROKE_WIDTH[props.size])
    );

    const mergedPathStrokeWidth = computed(
      () =>
        props.pathStrokeWidth ??
        (props.size === 'mini'
          ? mergedStrokeWidth.value
          : Math.max(2, mergedStrokeWidth.value - 2))
    );

    const radius = computed(
      () => (mergedWidth.value - mergedStrokeWidth.value) / 2
    );
    const perimeter = computed(() => Math.PI * 2 * radius.value);
    const center = computed(() => mergedWidth.value / 2);

    const linearGradientId = computed(() => {
      __ARCO_PROGRESS_SEED += 1;
      return `${prefixCls}-linear-gradient-${__ARCO_PROGRESS_SEED}`;
    });

    const text = computed(() => `${NP.times(props.percent, 100)}%`);

    return {
      prefixCls,
      isLinearGradient,
      radius,
      text,
      perimeter,
      center,
      mergedWidth,
      mergedStrokeWidth,
      mergedPathStrokeWidth,
      linearGradientId,
    };
  },
});
</script>
