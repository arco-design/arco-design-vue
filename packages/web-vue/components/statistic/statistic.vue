<template>
  <div :class="prefixCls">
    <div v-if="title || $slots.title" :class="`${prefixCls}-title`">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div :class="`${prefixCls}-content`">
      <div :class="`${prefixCls}-value`" :style="valueStyle">
        <span v-if="showPlaceholder">{{ placeholder }}</span>
        <template v-else>
          <span v-if="$slots.prefix" :class="`${prefixCls}-prefix`">
            <slot name="prefix" />
          </span>
          <template v-if="formatValue.isNumber">
            <span :class="`${prefixCls}-value-integer`">
              {{ formatValue.integer }}
            </span>
            <span
              v-if="formatValue.decimal"
              :class="`${prefixCls}-value-decimal`"
            >
              .{{ formatValue.decimal }}
            </span>
          </template>
          <template v-else>
            {{ formatValue.value }}
          </template>
          <span v-if="$slots.suffix" :class="`${prefixCls}-suffix`">
            <slot name="suffix" />
          </span>
        </template>
      </div>
      <div v-if="extra || $slots.extra" :class="`${prefixCls}-extra`">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import dayjs from 'dayjs';
// @ts-ignore
import BTween from 'b-tween';
import NP from 'number-precision';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber, isUndefined } from '../_utils/is';
import { Data } from '../_utils/types';

export default defineComponent({
  name: 'Statistic',
  props: {
    /**
     * @zh 数值显示的标题
     * @en Title of the numerical display
     */
    title: String,
    /**
     * @zh 数值显示的值
     * @en Numerical display value
     */
    value: {
      type: [Number, Object] as PropType<number | Date>,
    },
    /**
     * @zh 数值显示的格式 [dayjs](https://day.js.org/docs/en/display/format)（日期模式使用）
     * @en Format of numerical display [dayjs](https://day.js.org/docs/en/display/format) (used in date mode)
     */
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    /**
     * @zh 额外的显示内容
     * @en Additional display content
     */
    extra: String,
    /**
     * @zh 是否开始动画
     * @en Whether to start animation
     */
    start: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 小数保留位数（数字模式使用）
     * @en Decimal reserved digits (used in digital mode)
     */
    precision: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 进位分隔符（数字模式使用）
     * @en Carry separator (used in number mode)
     */
    separator: String,
    /**
     * @zh 是否展示进位分隔符（数字模式使用）
     * @en Whether to display the carry separator (used in number mode)
     */
    showGroupSeparator: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启动画
     * @en Whether to turn on animation
     */
    animation: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 动画的过度时间，单位`ms`
     * @en Animation's duration time, the unit `ms`
     */
    animationDuration: {
      type: Number,
      default: 2000,
    },
    /**
     * @zh 动画的起始值
     * @en The starting value of the animation
     */
    valueFrom: {
      type: Number,
      default: undefined,
    },
    /**
     * @zh 提示文字（当 value 为 undefined 时显示）
     * @en Prompt text (displayed when value is undefined )
     * @version 2.28.0
     */
    placeholder: {
      type: String,
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
     * @zh 动画完成后触发的回调
     * @en Callback at the end of the countdown
     */
    finish: () => true,
    /**
     * @zh 动画暂停切换时触发的回调
     * @en Callback triggered when the animation pause to switch
     * @param {boolean} paused
     */
    pauseChange: (paused: boolean) => true,
  },
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  /**
   * @zh 额外内容
   * @en Extra content
   * @slot extra
   */
  /**
   * @zh 前缀
   * @en Prefix
   * @slot prefix
   */
  /**
   * @zh 后缀
   * @en Suffix
   * @slot suffix
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('statistic');
    const numberValue = computed(() => {
      if (isNumber(props.value)) {
        return props.value;
      }
      return 0;
    });
    const innerValue = ref(props.valueFrom ?? props.value);
    const tween = ref(null);
    const { value } = toRefs(props);
    const animationPaused = ref(false);
    const animationElapsed = ref(0);

    const showPlaceholder = computed(() => isUndefined(props.value));

    const animation = (
      from: number = props.valueFrom ?? 0,
      to: number = numberValue.value,
      duration: number = props.animationDuration
    ) => {
      animationElapsed.value = 0;
      animationPaused.value = false;
      if (from !== to) {
        tween.value = new BTween({
          from: {
            value: from,
          },
          to: {
            value: to,
          },
          duration,
          easing: 'quartOut',
          onUpdate: (keys: Data) => {
            innerValue.value = keys.value;
          },
          onFinish: () => {
            innerValue.value = to;
            emit('finish');
          },
        });
        (tween.value as any)?.start();
      }
    };

    const formatValue = computed(() => {
      let _value: string | number | Date | undefined = innerValue.value;
      if (isNumber(_value)) {
        if (isNumber(props.precision)) {
          _value = NP.round(_value, props.precision).toFixed(props.precision);
        }
        const splitValue = String(_value).split('.');
        const integer = props.showGroupSeparator
          ? Number(splitValue[0]).toLocaleString('en-US')
          : splitValue[0];
        const decimal = splitValue[1];
        return {
          isNumber: true,
          integer,
          decimal,
        };
      }
      if (props.format) {
        _value = dayjs(_value).format(props.format);
      }
      return {
        isNumber: false,
        value: _value,
      };
    });

    const _pause = (value = !animationPaused.value) => {
      if (
        props.animation &&
        props.start &&
        innerValue.value !== numberValue.value
      ) {
        if (value) {
          if (tween.value) {
            animationElapsed.value = (tween.value as any)?.elapsed;
            animationPaused.value = true;
            (tween.value as any)?.stop();
            tween.value = null;
          }
        } else {
          animation(
            innerValue.value as number,
            numberValue.value,
            Math.max(props.animationDuration - animationElapsed.value, 0)
          );
        }
      }
    };

    const _restart = (value?: number | Date) => {
      if (tween.value) {
        (tween.value as any)?.stop();
        tween.value = null;
      }
      innerValue.value = value ?? props.valueFrom ?? props.value;
      if (props.animation && props.start) {
        animation();
      }
    };

    onMounted(() => {
      if (props.animation && props.start) {
        animation();
      }
    });

    watch(
      () => props.start,
      (value) => {
        if (value && props.animation && !tween.value) {
          animation();
        }
      }
    );

    watch(animationPaused, (value) => {
      emit('pauseChange', value);
    });

    watch(value, _restart);

    return {
      prefixCls,
      showPlaceholder,
      formatValue,
      _pause,
      _restart,
    };
  },

  methods: {
    /**
     * @zh 暂停或继续动画
     * @en Pause or continue animation
     * @param { boolean } paused
     * @public
     */
    pause(paused?: boolean) {
      this._pause(paused);
    },
    /**
     * @zh 重新开始执行动画
     * @en Restart execution animation
     * @public
     */
    restart() {
      this._restart();
    },
  },
});
</script>
