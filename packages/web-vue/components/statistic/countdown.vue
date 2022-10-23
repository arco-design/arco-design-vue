<template>
  <div :class="[`${prefixCls}`, `${prefixCls}-countdown`]">
    <div v-if="title || $slots.title" :class="`${prefixCls}-title`">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div :class="`${prefixCls}-content`">
      <div :class="`${prefixCls}-value`" :style="valueStyle">
        {{ displayValue }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  CSSProperties,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getPrefixCls } from '../_utils/global-config';
import { getDateString } from './utils';

export default defineComponent({
  name: 'Countdown',
  props: {
    /**
     * @zh 倒计时的标题
     * @en Countdown title
     */
    title: String,
    /**
     * @zh 倒计时的值
     * @en Countdown value
     */
    value: {
      type: Number,
      default: () => Date.now() + 300000,
    },
    /**
     * @zh 用于修正初始化时间显示不正确
     * @en Used to correct the incorrect display of the initialization time
     */
    now: {
      type: Number,
      default: () => Date.now(),
    },
    /**
     * @zh 倒计时的展示格式 [dayjs](https://day.js.org/docs/en/display/format)
     * @en Countdown display format [dayjs](https://day.js.org/docs/en/display/format)
     */
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    /**
     * @zh 是否开始倒计时
     * @en Whether to start the countdown
     */
    start: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 自定义显示值的样式
     * @en Custom value style
     * @version 2.32.0
     */
    valueStyle: {
      type: Object as PropType<CSSProperties>,
    },
  },
  emits: {
    /**
     * @zh 倒计时完成后触发的回调
     * @en Callback at the end of the countdown
     */
    finish: () => true,
  },
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('statistic');
    const { start, value, now, format } = toRefs(props);

    const displayValue = ref(
      getDateString(
        Math.max(dayjs(props.value).diff(dayjs(props.now), 'millisecond'), 0),
        props.format
      )
    );

    watch([value, now, format], () => {
      const _value = getDateString(
        Math.max(dayjs(props.value).diff(dayjs(props.now), 'millisecond'), 0),
        props.format
      );
      if (_value !== displayValue.value) {
        displayValue.value = _value;
      }
    });

    const timer = ref(0);

    const stopTimer = () => {
      if (timer.value) {
        window.clearInterval(timer.value);
        timer.value = 0;
      }
    };

    const startTimer = () => {
      if (dayjs(props.value).valueOf() < Date.now()) {
        return;
      }

      timer.value = window.setInterval(() => {
        const _value = dayjs(props.value).diff(dayjs(), 'millisecond');
        if (_value <= 0) {
          stopTimer();
          emit('finish');
        }
        displayValue.value = getDateString(Math.max(_value, 0), props.format);
      }, 1000 / 30);
    };

    onMounted(() => {
      if (props.start) {
        startTimer();
      }
    });

    onBeforeUnmount(() => {
      stopTimer();
    });

    watch(start, (value) => {
      if (value && !timer.value) {
        startTimer();
      }
    });

    return {
      prefixCls,
      displayValue,
    };
  },
});
</script>
