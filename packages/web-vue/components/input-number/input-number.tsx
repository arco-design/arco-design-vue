import { computed, defineComponent, PropType, ref, watch } from 'vue';
import NP from 'number-precision';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber, isUndefined } from '../_utils/is';
import IconUp from '../icon/icon-up';
import IconDown from '../icon/icon-down';
import IconPlus from '../icon/icon-plus';
import IconMinus from '../icon/icon-minus';
import ArcoButton from '../button';
import ArcoInput from '../input';
import { EmitType } from '../_utils/types';
import { Size, SIZES } from '../_utils/constant';

type StepMethods = 'minus' | 'plus';

const InputGroup = ArcoInput.Group;
const MODES = ['embed', 'button'] as const;
const SPEED = 150;

NP.enableBoundaryChecking(false);

export default defineComponent({
  name: 'InputNumber',
  inheritAttrs: false,
  props: {
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: Number,
    /**
     * @zh 默认值（非受控模式）
     * @en Default value (uncontrolled mode)
     */
    defaultValue: Number,
    /**
     * @zh 模式（`embed`：按钮内嵌模式，`button`：左右按钮模式）
     * @en Mode (`embed`: button embedded mode, `button`: left and right button mode)
     * @values 'embed', 'button'
     */
    mode: {
      type: String as PropType<typeof MODES[number]>,
      default: 'embed',
      validator: (value: any) => MODES.includes(value),
    },
    /**
     * @zh 数字精度
     * @en Precision
     */
    precision: Number,
    /**
     * @zh 数字变化步长
     * @en Number change step
     */
    step: {
      type: Number,
      default: 1,
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
     * @zh 最大值
     * @en Max
     */
    max: {
      type: Number,
      default: Infinity,
    },
    /**
     * @zh 最小值
     * @en Min
     */
    min: {
      type: Number,
      default: -Infinity,
    },
    /**
     * @zh 定义输入框展示值
     * @en Define the display value of the input
     */
    formatter: {
      type: Function,
    },
    /**
     * @zh 从 `formatter` 转换为数字，和 `formatter` 搭配使用
     * @en Convert from `formatter` to number, and use with `formatter`
     */
    parser: {
      type: Function,
    },
    /**
     * @zh 输入框提示文字
     * @en Input prompt text
     */
    placeholder: String,
    /**
     * @zh 是否隐藏按钮（仅在`embed`模式可用）
     * @en Whether to hide the button (only available in `embed` mode)
     */
    hideButton: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 输入框大小
     * @en Input size
     * @values 'mini', 'small', 'medium', 'large'
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
      validator: (value: any) => {
        return SIZES.includes(value);
      },
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<
        EmitType<(value: number | undefined) => void>
      >,
    },
    onFocus: {
      type: [Function, Array] as PropType<EmitType<(ev: FocusEvent) => void>>,
    },
    onBlur: {
      type: [Function, Array] as PropType<EmitType<(ev: FocusEvent) => void>>,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @property {number|undefined} value
     */
    'change',
    /**
     * @zh 输入框获取焦点时触发
     * @en Triggered when the input gets focus
     */
    'focus',
    /**
     * @zh 输入框失去焦点时触发
     * @en Triggered when the input box loses focus
     */
    'blur',
  ],
  setup(props, { emit, attrs }) {
    const prefixCls = getPrefixCls('input-number');
    const inputRef = ref<HTMLInputElement>();
    const _value = ref(
      isUndefined(props.defaultValue)
        ? ''
        : props.formatter?.(String(props.defaultValue)) ??
            String(props.defaultValue)
    );

    const numberPrefix = ref('');

    const mergedPrecision = computed(() => {
      if (isNumber(props.precision)) {
        const decimal = `${props.step}`.split('.')[1];
        const stepPrecision = (decimal && decimal.length) || 0;
        return Math.max(stepPrecision, props.precision);
      }
      return undefined;
    });

    // 内部保持传递字符型数值
    const computedValue = computed(() => {
      if (
        isNumber(props.modelValue) &&
        props.modelValue !== Number(_value.value)
      ) {
        return (
          props.formatter?.(String(props.modelValue)) ??
          String(props.modelValue)
        );
      }
      if (numberPrefix.value && !_value.value) {
        return numberPrefix.value;
      }
      return _value.value;
    });

    const isMax = ref(false);
    const isMin = ref(false);

    // 步长重复定时器
    let repeatTimer = 0;

    const clearRepeatTimer = () => {
      if (repeatTimer) {
        window.clearTimeout(repeatTimer);
        repeatTimer = 0;
      }
    };

    const getLegalValue = (
      value: string | number | undefined
    ): number | undefined => {
      // 空值时返回undefined
      if (isUndefined(value) || value === '') {
        return undefined;
      }

      let numberValue = isNumber(value) ? value : Number(value);

      if (Number.isNaN(numberValue)) {
        return undefined;
      }

      if (isNumber(props.min) && numberValue < props.min) {
        numberValue = props.min;
      }

      if (isNumber(props.max) && numberValue > props.max) {
        numberValue = props.max;
      }

      return isNumber(mergedPrecision.value)
        ? NP.round(numberValue, mergedPrecision.value)
        : numberValue;
    };

    const finalValue = getLegalValue(computedValue.value);
    if (isNumber(finalValue)) {
      if (finalValue <= props.min) {
        isMin.value = true;
      }
      if (finalValue >= props.max) {
        isMax.value = true;
      }
    }

    const updateValue = (value: string | number | undefined, ev: Event) => {
      const finalValue = getLegalValue(value);
      isMin.value = false;
      isMax.value = false;
      if (isNumber(finalValue)) {
        if (finalValue <= props.min) {
          isMin.value = true;
        }
        if (finalValue >= props.max) {
          isMax.value = true;
        }
      }
      emit('update:modelValue', finalValue);
      emit('change', finalValue, ev);
    };

    const handleStepButton = (
      event: Event,
      method: StepMethods,
      needRepeat = false
    ) => {
      event.preventDefault();
      inputRef.value?.focus();

      if (
        props.disabled ||
        (method === 'plus' && isMax.value) ||
        (method === 'minus' && isMin.value)
      ) {
        return;
      }

      let nextValue: number;
      if (!computedValue.value) {
        nextValue = props.min === -Infinity ? 0 : props.min;
      } else {
        const numberValue = Number(
          props.parser?.(computedValue.value) ?? computedValue.value
        );
        nextValue = NP[method](numberValue, props.step);
      }

      _value.value = props.formatter?.(String(nextValue)) ?? String(nextValue);
      updateValue(nextValue, event);

      // 长按时持续触发
      if (needRepeat) {
        repeatTimer = window.setTimeout(
          () => (event.target as HTMLElement).dispatchEvent(event),
          SPEED
        );
      }
    };

    const handleInput = (value: string, ev: Event) => {
      value = value.trim().replace(/。/g, '.');
      value = props.parser?.(value) ?? value;

      if (isNumber(Number(value)) || /^(\.|-)$/.test(value)) {
        if (/^(\.|-)$/.test(value)) {
          numberPrefix.value = value;
        } else if (numberPrefix.value) {
          numberPrefix.value = '';
        }
        _value.value = props.formatter?.(value) ?? value;
        updateValue(value, ev);
      }
    };

    const handleFocus = (ev: FocusEvent) => {
      emit('focus', ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      if (computedValue.value) {
        const numberValue = Number(
          props.parser?.(computedValue.value) ?? computedValue.value
        );
        const finalValue = getLegalValue(numberValue);
        if (finalValue !== numberValue) {
          _value.value = isUndefined(finalValue)
            ? ''
            : props.formatter?.(String(finalValue)) ?? String(finalValue);
          updateValue(finalValue, ev);
        }
      }

      emit('blur', ev);
    };

    watch(
      () => props.modelValue,
      (value: number | undefined) => {
        let stringValue = isUndefined(value) ? '' : String(value);
        stringValue = props.formatter?.(stringValue) ?? stringValue;
        if (stringValue !== _value.value) {
          _value.value = stringValue;
        }
      }
    );

    const renderSuffix = () => (
      <div class={`${prefixCls}-step`}>
        <button
          class={[
            `${prefixCls}-step-button`,
            {
              [`${prefixCls}-step-button-disabled`]:
                props.disabled || isMax.value,
            },
          ]}
          type="button"
          disabled={props.disabled || isMax.value}
          onMousedown={(e) => handleStepButton(e, 'plus', true)}
          onMouseup={clearRepeatTimer}
          onMouseleave={clearRepeatTimer}
        >
          <IconUp />
        </button>
        <button
          class={[
            `${prefixCls}-step-button`,
            {
              [`${prefixCls}-step-button-disabled`]:
                props.disabled || isMin.value,
            },
          ]}
          type="button"
          disabled={props.disabled || isMin.value}
          onMousedown={(e) => handleStepButton(e, 'minus', true)}
          onMouseup={clearRepeatTimer}
          onMouseleave={clearRepeatTimer}
        >
          <IconDown />
        </button>
      </div>
    );
    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-mode-${props.mode}`,
      `${prefixCls}-size-${props.size}`,
    ]);

    const renderInput = () => {
      const inputSlots =
        props.mode === 'embed' && !props.hideButton
          ? { suffix: renderSuffix }
          : {};

      return (
        <ArcoInput
          {...attrs}
          ref={inputRef}
          class={cls.value}
          type="text"
          size={props.size}
          modelValue={computedValue.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          v-slots={inputSlots}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    };

    const render = () => {
      if (props.mode === 'embed') {
        return renderInput();
      }

      return (
        <InputGroup>
          <ArcoButton
            size={props.size}
            v-slots={{ icon: () => <IconMinus /> }}
            disabled={props.disabled || isMin.value}
            onMousedown={(e: MouseEvent) => handleStepButton(e, 'minus', true)}
            onMouseup={clearRepeatTimer}
            onMouseleave={clearRepeatTimer}
          />
          {renderInput()}
          <ArcoButton
            size={props.size}
            v-slots={{ icon: () => <IconPlus /> }}
            disabled={props.disabled || isMax.value}
            onMousedown={(e: MouseEvent) => handleStepButton(e, 'plus', true)}
            onMouseup={clearRepeatTimer}
            onMouseleave={clearRepeatTimer}
          />
        </InputGroup>
      );
    };

    return {
      inputRef,
      render,
    };
  },
  methods: {
    /**
     * @zh 使输入框获取焦点
     * @en Make the input box focus
     * @public
     */
    focus() {
      (this.inputRef as HTMLInputElement)?.focus();
    },
    /**
     * @zh 使输入框失去焦点
     * @en Make the input box lose focus
     * @public
     */
    blur() {
      (this.inputRef as HTMLInputElement)?.blur();
    },
  },
  render() {
    return this.render();
  },
});
