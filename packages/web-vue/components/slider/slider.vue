<template>
  <div :class="cls">
    <div ref="trackRef" :class="trackCls" @click="handleClick">
      <div :class="`${prefixCls}-bar`" :style="getBarStyle(computedValue)" />
      <slider-ticks
        v-if="showTicks"
        :value="computedValue"
        :step="step"
        :min="min"
        :max="max"
        :direction="direction"
      />
      <slider-dots
        v-if="marks"
        :data="markList"
        :min="min"
        :max="max"
        :direction="direction"
      />
      <slider-marks
        v-if="marks"
        :data="markList"
        :min="min"
        :max="max"
        :direction="direction"
      />
      <slider-button
        v-if="range"
        :style="getBtnStyle(computedValue[0])"
        :value="computedValue[0]"
        :direction="direction"
        :disabled="mergedDisabled"
        :min="min"
        :max="max"
        :format-tooltip="formatTooltip"
        :show-tooltip="showTooltip"
        @movestart="handleMoveStart"
        @moving="handleStartMoving"
        @moveend="handleMoveEnd"
      />
      <slider-button
        :style="getBtnStyle(computedValue[1])"
        :value="computedValue[1]"
        :direction="direction"
        :disabled="mergedDisabled"
        :min="min"
        :max="max"
        :format-tooltip="formatTooltip"
        :show-tooltip="showTooltip"
        @movestart="handleMoveStart"
        @moving="handleEndMoving"
        @moveend="handleMoveEnd"
      />
    </div>
    <slider-input
      v-if="showInput"
      :model-value="computedValue"
      :min="min"
      :max="max"
      :step="step"
      :range="range"
      :disabled="disabled"
      @start-change="handleStartChange"
      @end-change="handleEndChange"
    />
  </div>
</template>

<script lang="ts">
import type { PropType, CSSProperties } from 'vue';
import { computed, defineComponent, ref, toRef, toRefs, watch } from 'vue';
import NP from 'number-precision';
import { getPrefixCls } from '../_utils/global-config';
import SliderButton from './slider-button.vue';
import SliderDots from './slider-dots.vue';
import SliderMarks from './slider-marks.vue';
import SliderTicks from './slider-ticks.vue';
import SliderInput from './slider-input.vue';
import { isArray, isUndefined } from '../_utils/is';
import { Direction, DIRECTIONS } from '../_utils/constant';
import { getOffsetPercent, getPositionStyle } from './utils';
import { useFormItem } from '../_hooks/use-form-item';

export default defineComponent({
  name: 'Slider',
  components: {
    SliderButton,
    SliderDots,
    SliderMarks,
    SliderTicks,
    SliderInput,
  },
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: {
      type: [Number, Array] as PropType<number | [number, number]>,
      default: undefined,
    },
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: [Number, Array] as PropType<number | [number, number]>,
      default: 0,
    },
    /**
     * @zh 滑动的步长
     * @en Sliding step
     */
    step: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 滑动范围的最小值
     * @en Minimum sliding range
     */
    min: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 设置显示的标签
     * @en Set the displayed label
     */
    marks: {
      type: Object as PropType<Record<number, string>>,
    },
    /**
     * @zh 滑动范围的最大值
     * @en Maximum sliding range
     */
    max: {
      type: Number,
      default: 100,
    },
    /**
     * @zh 滑动输入条的方向
     * @en The direction of the slider
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否显示刻度线
     * @en Whether to show ticks
     */
    showTicks: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否显示输入框
     * @en Whether to show the input
     */
    showInput: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启范围选择
     * @en Whether to use range selection
     */
    range: {
      type: Boolean,
      default: false,
    },
    formatTooltip: {
      type: Function,
    },
    /**
     * @zh 是否显示tooltip
     * @en Whether to show tooltip
     * @version 2.42.0
     */
    showTooltip: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    'update:modelValue': (value: number | [number, number]) => true,
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @param {number | [number, number]} value
     */
    'change': (value: number | [number, number]) => true,
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const prefixCls = getPrefixCls('slider');
    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled: toRef(props, 'disabled'),
    });

    const trackRef = ref<HTMLElement | null>(null);
    const trackRect = ref<DOMRect>();
    const defaultValue = props.modelValue
      ? props.modelValue
      : props.defaultValue;

    const startValue = ref(isArray(defaultValue) ? defaultValue[0] : 0);

    const endValue = ref(
      isArray(defaultValue) ? defaultValue[1] : defaultValue
    );

    watch(modelValue, (value) => {
      if (isArray(value)) {
        startValue.value = value[0] ?? props.min ?? 0;
        endValue.value = value[1] ?? props.min ?? 0;
      } else {
        endValue.value = value ?? props.min ?? 0;
      }
    });

    const handleChange = () => {
      if (props.range) {
        emit('update:modelValue', [startValue.value, endValue.value]);
        emit('change', [startValue.value, endValue.value]);
      } else {
        emit('update:modelValue', endValue.value);
        emit('change', endValue.value);
      }
      eventHandlers.value?.onChange?.();
    };

    const handleStartChange = (value?: number) => {
      value = value ?? props.min;
      startValue.value = value;
      handleChange();
    };

    const handleEndChange = (value?: number) => {
      value = value ?? props.min;
      endValue.value = value;
      handleChange();
    };

    const computedValue = computed<[number, number]>(() => {
      if (props.range) {
        if (isArray(props.modelValue)) {
          return props.modelValue;
        }
        return [startValue.value, props.modelValue ?? endValue.value];
      }
      if (isUndefined(props.modelValue)) {
        return [startValue.value, endValue.value];
      }
      if (isArray(props.modelValue)) {
        return [props.min ?? 0, props.modelValue[1]];
      }
      return [props.min ?? 0, props.modelValue];
    });

    // 标签数组
    const markList = computed(() =>
      Object.keys(props.marks || {}).map((index) => {
        const key = Number(index);
        return {
          key,
          content: props.marks?.[key],
          isActive:
            key >= computedValue.value[0] && key <= computedValue.value[1],
        };
      })
    );

    const getBtnStyle = (value: number) =>
      getPositionStyle(
        getOffsetPercent(value, [props.min, props.max]),
        props.direction
      );

    const isDragging = ref(false);

    const handleMoveStart = () => {
      isDragging.value = true;
      if (trackRef.value) {
        trackRect.value = trackRef.value.getBoundingClientRect();
      }
    };

    // 通过坐标获取value值
    function getValueByCoords(x: number, y: number): number {
      if (!trackRect.value) {
        return 0;
      }
      const { left, top, width, height } = trackRect.value;
      const trackLength = props.direction === 'horizontal' ? width : height;
      const stepLength = (trackLength * props.step) / (props.max - props.min);
      let diff = props.direction === 'horizontal' ? x - left : top + height - y;
      if (diff < 0) diff = 0;
      if (diff > trackLength) diff = trackLength;

      // 根据diff计算步数
      const steps = Math.round(diff / stepLength);

      return NP.plus(props.min, NP.times(steps, props.step));
    }

    const handleEndMoving = (x: number, y: number) => {
      endValue.value = getValueByCoords(x, y);
      handleChange();
    };

    const handleClick = (e: MouseEvent) => {
      if (mergedDisabled.value) {
        return;
      }

      const { clientX, clientY } = e;

      if (trackRef.value) {
        trackRect.value = trackRef.value.getBoundingClientRect();
      }

      endValue.value = getValueByCoords(clientX, clientY);
      handleChange();
    };

    function getBarStyle([start, end]: [number, number]): CSSProperties {
      if (start > end) {
        [start, end] = [end, start];
      }
      return props.direction === 'vertical'
        ? {
            bottom: getOffsetPercent(start, [props.min, props.max]),
            top: getOffsetPercent(props.max + props.min - end, [
              props.min,
              props.max,
            ]),
          }
        : {
            left: getOffsetPercent(start, [props.min, props.max]),
            right: getOffsetPercent(props.max + props.min - end, [
              props.min,
              props.max,
            ]),
          };
    }

    const handleStartMoving = (x: number, y: number) => {
      startValue.value = getValueByCoords(x, y);
      handleChange();
    };

    const handleMoveEnd = () => {
      isDragging.value = false;
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-vertical`]: props.direction === 'vertical',
        [`${prefixCls}-with-marks`]: Boolean(props.marks),
      },
    ]);

    const trackCls = computed(() => [
      `${prefixCls}-track`,
      {
        [`${prefixCls}-track-disabled`]: mergedDisabled.value,
        [`${prefixCls}-track-vertical`]: props.direction === 'vertical',
      },
    ]);

    return {
      prefixCls,
      cls,
      trackCls,
      trackRef,
      computedValue,
      mergedDisabled,
      markList,
      getBtnStyle,
      getBarStyle,
      handleClick,
      handleMoveStart,
      handleEndMoving,
      handleMoveEnd,
      handleStartMoving,
      handleStartChange,
      handleEndChange,
    };
  },
});
</script>
