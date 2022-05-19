<template>
  <div
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="percent"
    :class="`${prefixCls}-wrapper`"
  >
    <div :class="prefixCls" :style="style">
      <div :class="`${prefixCls}-bar-buffer`" />
      <div :class="[`${prefixCls}-bar`]" :style="barStyle" />
    </div>
    <div v-if="showText" :class="`${prefixCls}-text`">
      <slot name="text" :percent="percent">
        {{ text }}
        <icon-exclamation-circle-fill v-if="status === 'danger'" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import NP from 'number-precision';
import { getPrefixCls } from '../_utils/global-config';
import { isObject } from '../_utils/is';
import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
import { Status } from '../_utils/constant';

const DEFAULT_STROKE_WIDTH = {
  small: 3,
  medium: 4,
  large: 8,
};

const getBackground = (color?: string | Record<string, string>) => {
  if (!color) {
    return undefined;
  }

  if (isObject(color)) {
    const val = Object.keys(color)
      .map((key) => `${color[key]} ${key}`)
      .join(',');
    return {
      backgroundImage: `linear-gradient(to right, ${val})`,
    };
  }
  return {
    backgroundColor: color,
  };
};

export default defineComponent({
  name: 'ProgressLine',
  components: {
    IconExclamationCircleFill,
  },
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    animation: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    strokeWidth: {
      type: Number,
      default: 4,
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    color: {
      type: [String, Object],
      default: undefined,
    },
    trackColor: String,
    formatText: {
      type: Function,
      default: undefined,
    },
    status: {
      type: String as PropType<Status>,
    },
    showText: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('progress-line');

    const strokeWidth = computed(() => {
      if (props.strokeWidth !== 4) {
        return props.strokeWidth;
      }
      return DEFAULT_STROKE_WIDTH[props.size];
    });

    const text = computed(() => `${NP.times(props.percent, 100)}%`);

    const style = computed(() => ({
      width: props.width,
      height: `${strokeWidth.value}px`,
      backgroundColor: props.trackColor,
    }));

    // const computedText = computed(() => {
    //   if (isFunction(props.formatText)) {
    //     return props.formatText(props.percent);
    //   }
    //   return `${props.percent}%`;
    // });

    const barStyle = computed(() => ({
      width: `${props.percent * 100}%`,
      ...getBackground(props.color),
    }));

    return {
      prefixCls,
      style,
      barStyle,
      text,
    };
  },
});
</script>
