import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import NP from 'number-precision';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber, isUndefined } from '../_utils/is';
import IconUp from '../icon/icon-up';
import IconDown from '../icon/icon-down';
import IconPlus from '../icon/icon-plus';
import IconMinus from '../icon/icon-minus';
import ArcoButton from '../button';
import ArcoInput from '../input';
import { Size } from '../_utils/constant';
import { useFormItem } from '../_hooks/use-form-item';
import { useSize } from '../_hooks/use-size';
import { getKeyDownHandler, KEYBOARD_KEY } from '../_utils/keyboard';

type StepMethods = 'minus' | 'plus';

const SPEED = 150;

NP.enableBoundaryChecking(false);

export default defineComponent({
  name: 'InputNumber',
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
      type: String as PropType<'embed' | 'button'>,
      default: 'embed',
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
     * @zh 是否为错误状态
     * @en Whether it is an error state
     */
    error: {
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
     * @zh 是否隐藏按钮
     * @en Whether to hide the button
     */
    hideButton: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 输入框大小
     * @en Input size
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 是否允许清空输入框
     * @en Whether to allow the input to be cleared
     */
    allowClear: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 触发 `v-model` 的事件
     * @en Trigger event for `v-model`
     */
    modelEvent: {
      type: String as PropType<'change' | 'input'>,
      default: 'change',
    },
    /**
     * @zh 只读
     * @en Readonly
     * @version 3.33.1
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (value: number | undefined) => true,
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @param { number | undefined } value
     * @param {Event} ev
     */
    'change': (value: number | undefined, ev: Event) => true,
    /**
     * @zh 输入框获取焦点时触发
     * @en Triggered when the input gets focus
     * @param {FocusEvent} ev
     */
    'focus': (ev: FocusEvent) => true,
    /**
     * @zh 输入框失去焦点时触发
     * @en Triggered when the input box loses focus
     * @param {FocusEvent} ev
     */
    'blur': (ev: FocusEvent) => true,
    /**
     * @zh 用户点击清除按钮时触发
     * @en Triggered when the user clicks the clear button
     * @param {Event} ev
     * @version 2.23.0
     */
    'clear': (ev: Event) => true,
    /**
     * @zh 输入时触发
     * @en Triggered on input
     * @param { number | undefined } value
     * @param {string} inputValue
     * @param {Event} ev
     * @version 2.27.0
     */
    'input': (value: number | undefined, inputValue: string, ev: Event) => true,
  },
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
  /**
   * @zh 前置标签
   * @en Prepend
   * @slot prepend
   */
  /**
   * @zh 后置标签
   * @en Append
   * @slot append
   */
  setup(props, { emit, slots }) {
    const { size, disabled } = toRefs(props);
    const prefixCls = getPrefixCls('input-number');
    const inputRef = ref<HTMLInputElement>();
    const {
      mergedSize: _mergedSize,
      mergedDisabled,
      eventHandlers,
    } = useFormItem({
      size,
      disabled,
    });
    const { mergedSize } = useSize(_mergedSize);
    const mergedPrecision = computed(() => {
      if (isNumber(props.precision)) {
        const decimal = `${props.step}`.split('.')[1];
        const stepPrecision = (decimal && decimal.length) || 0;
        return Math.max(stepPrecision, props.precision);
      }
      return undefined;
    });

    const getStringValue = (number: number | undefined) => {
      if (!isNumber(number)) {
        return '';
      }

      const numString = mergedPrecision.value
        ? number.toFixed(mergedPrecision.value)
        : String(number);
      return props.formatter?.(numString) ?? numString;
    };

    // inner input value to display
    const _value = ref(getStringValue(props.modelValue ?? props.defaultValue));

    const valueNumber = computed(() => {
      if (!_value.value) {
        return undefined;
      }
      const number = Number(props.parser?.(_value.value) ?? _value.value);
      return Number.isNaN(number) ? undefined : number;
    });

    const isMin = ref(
      isNumber(valueNumber.value) && valueNumber.value <= props.min
    );
    const isMax = ref(
      isNumber(valueNumber.value) && valueNumber.value >= props.max
    );

    // 步长重复定时器
    let repeatTimer = 0;

    const clearRepeatTimer = () => {
      if (repeatTimer) {
        window.clearTimeout(repeatTimer);
        repeatTimer = 0;
      }
    };

    const getLegalValue = (value: number | undefined): number | undefined => {
      if (isUndefined(value)) {
        return undefined;
      }

      if (isNumber(props.min) && value < props.min) {
        value = props.min;
      }

      if (isNumber(props.max) && value > props.max) {
        value = props.max;
      }

      return isNumber(mergedPrecision.value)
        ? NP.round(value, mergedPrecision.value)
        : value;
    };

    const updateNumberStatus = (number: number | undefined) => {
      let _isMin = false;
      let _isMax = false;
      if (isNumber(number)) {
        if (number <= props.min) {
          _isMin = true;
        }
        if (number >= props.max) {
          _isMax = true;
        }
      }
      if (isMax.value !== _isMax) {
        isMax.value = _isMax;
      }
      if (isMin.value !== _isMin) {
        isMin.value = _isMin;
      }
    };

    const handleExceedRange = () => {
      const finalValue = getLegalValue(valueNumber.value);
      const stringValue = getStringValue(finalValue);
      if (finalValue !== valueNumber.value || _value.value !== stringValue) {
        _value.value = stringValue;
      }

      emit('update:modelValue', finalValue);
    };
    watch(
      () => props.min,
      (newVal) => {
        const _isMin =
          isNumber(valueNumber.value) && valueNumber.value <= newVal;
        if (isMin.value !== _isMin) {
          isMin.value = _isMin;
        }

        const isExceedMinValue =
          isNumber(valueNumber.value) && valueNumber.value < newVal;
        if (isExceedMinValue) {
          handleExceedRange();
        }
      }
    );
    watch(
      () => props.max,
      (newVal) => {
        const _isMax =
          isNumber(valueNumber.value) && valueNumber.value >= newVal;
        if (isMax.value !== _isMax) {
          isMax.value = _isMax;
        }

        const isExceedMaxValue =
          isNumber(valueNumber.value) && valueNumber.value > newVal;
        if (isExceedMaxValue) {
          handleExceedRange();
        }
      }
    );

    const nextStep = (method: StepMethods, event: Event) => {
      if (
        mergedDisabled.value ||
        (method === 'plus' && isMax.value) ||
        (method === 'minus' && isMin.value)
      ) {
        return;
      }

      let nextValue: number | undefined;
      if (isNumber(valueNumber.value)) {
        nextValue = getLegalValue(NP[method](valueNumber.value, props.step));
      } else {
        nextValue = props.min === -Infinity ? 0 : props.min;
      }

      _value.value = getStringValue(nextValue);
      updateNumberStatus(nextValue);
      emit('update:modelValue', nextValue);
      emit('change', nextValue, event);
    };

    const handleStepButton = (
      event: Event,
      method: StepMethods,
      needRepeat = false
    ) => {
      event.preventDefault();
      inputRef.value?.focus();

      nextStep(method, event);

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
        _value.value = props.formatter?.(value) ?? value;
        updateNumberStatus(valueNumber.value);
        if (props.modelEvent === 'input') {
          emit('update:modelValue', valueNumber.value);
        }
        emit('input', valueNumber.value, _value.value, ev);
      }
    };

    const handleFocus = (ev: FocusEvent) => {
      emit('focus', ev);
    };

    const handleChange = (value: string, ev: Event) => {
      const finalValue = getLegalValue(valueNumber.value);
      const stringValue = getStringValue(finalValue);
      if (finalValue !== valueNumber.value || _value.value !== stringValue) {
        _value.value = stringValue;
        updateNumberStatus(finalValue);
      }

      nextTick(() => {
        if (isNumber(props.modelValue) && props.modelValue !== finalValue) {
          // TODO: verify number
          _value.value = getStringValue(props.modelValue);
          updateNumberStatus(props.modelValue);
        }
      });

      emit('update:modelValue', finalValue);
      emit('change', finalValue, ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      emit('blur', ev);
    };

    const handleClear = (ev: Event) => {
      _value.value = '';
      emit('update:modelValue', undefined);
      emit('change', undefined, ev);
      eventHandlers.value?.onChange?.(ev);
      emit('clear', ev);
    };

    const onKeyDown = getKeyDownHandler(
      new Map([
        [
          KEYBOARD_KEY.ARROW_UP,
          (ev: Event) => {
            ev.preventDefault();
            !props.readOnly && nextStep('plus', ev);
          },
        ],
        [
          KEYBOARD_KEY.ARROW_DOWN,
          (ev: Event) => {
            ev.preventDefault();
            !props.readOnly && nextStep('minus', ev);
          },
        ],
      ])
    );

    watch(
      () => props.modelValue,
      (value: number | undefined) => {
        if (value !== valueNumber.value) {
          // TODO: verify number
          _value.value = getStringValue(value);
          updateNumberStatus(value);
        }
      }
    );

    const renderSuffix = () => {
      if (props.readOnly) {
        return null;
      }
      return (
        <>
          {slots.suffix?.()}
          <div class={`${prefixCls}-step`}>
            <button
              class={[
                `${prefixCls}-step-button`,
                {
                  [`${prefixCls}-step-button-disabled`]:
                    mergedDisabled.value || isMax.value,
                },
              ]}
              type="button"
              tabindex="-1"
              disabled={mergedDisabled.value || isMax.value}
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
                    mergedDisabled.value || isMin.value,
                },
              ]}
              type="button"
              tabindex="-1"
              disabled={mergedDisabled.value || isMin.value}
              onMousedown={(e) => handleStepButton(e, 'minus', true)}
              onMouseup={clearRepeatTimer}
              onMouseleave={clearRepeatTimer}
            >
              <IconDown />
            </button>
          </div>
        </>
      );
    };
    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-mode-${props.mode}`,
      `${prefixCls}-size-${mergedSize.value}`,
      {
        [`${prefixCls}-readonly`]: props.readOnly,
      },
    ]);

    const renderPrependButton = () => {
      return (
        <ArcoButton
          size={mergedSize.value}
          // @ts-ignore
          tabindex="-1"
          v-slots={{ icon: () => <IconMinus /> }}
          class={`${prefixCls}-step-button`}
          disabled={mergedDisabled.value || isMin.value}
          // @ts-ignore
          onMousedown={(ev: MouseEvent) => handleStepButton(ev, 'minus', true)}
          onMouseup={clearRepeatTimer}
          onMouseleave={clearRepeatTimer}
        />
      );
    };

    const renderAppendButton = () => {
      return (
        <ArcoButton
          size={mergedSize.value}
          // @ts-ignore
          tabindex="-1"
          v-slots={{ icon: () => <IconPlus /> }}
          class={`${prefixCls}-step-button`}
          disabled={mergedDisabled.value || isMax.value}
          // @ts-ignore
          onMousedown={(ev: MouseEvent) => handleStepButton(ev, 'plus', true)}
          onMouseup={clearRepeatTimer}
          onMouseleave={clearRepeatTimer}
        />
      );
    };

    const render = () => {
      const _slots =
        props.mode === 'embed'
          ? {
              prepend: slots.prepend,
              prefix: slots.prefix,
              suffix: props.hideButton ? slots.suffix : renderSuffix,
              append: slots.append,
            }
          : {
              prepend: props.hideButton ? slots.prepend : renderPrependButton,
              prefix: slots.prefix,
              suffix: slots.suffix,
              append: props.hideButton ? slots.append : renderAppendButton,
            };

      return (
        <ArcoInput
          key={`__arco__${props.mode}`}
          v-slots={_slots}
          ref={inputRef}
          class={cls.value}
          type="text"
          allowClear={props.allowClear}
          size={mergedSize.value}
          modelValue={_value.value}
          placeholder={props.placeholder}
          disabled={mergedDisabled.value}
          readonly={props.readOnly}
          error={props.error}
          inputAttrs={{
            'role': 'spinbutton',
            'aria-valuemax': props.max,
            'aria-valuemin': props.min,
            'aria-valuenow': _value.value,
          }}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClear={handleClear}
          onChange={handleChange}
          // @ts-ignore
          onKeydown={onKeyDown}
        />
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
