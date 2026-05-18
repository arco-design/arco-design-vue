import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';

import NP from 'number-precision';

import { useAllowClear } from '../_hooks/use-allow-clear';
import { useFormItem } from '../_hooks/use-form-item';
import { useSize } from '../_hooks/use-size';
import { Size } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber, isUndefined } from '../_utils/is';
import { getKeyDownHandler, KEYBOARD_KEY } from '../_utils/keyboard';
import SDButton from '../button';
import IconDown from '../icon/icon-down';
import IconMinus from '../icon/icon-minus';
import IconPlus from '../icon/icon-plus';
import IconUp from '../icon/icon-up';
import SDInput from '../input';

type StepMethods = 'minus' | 'plus';
type InputNumberValue = string | number | null | undefined;
type InputNumberValueMode = 'string' | 'number';

const FIRST_DELAY = 800;
const SPEED = 150;

NP.enableBoundaryChecking(false);

export default defineComponent({
  name: 'InputNumber',
  props: {
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: {
      type: [String, Number] as PropType<string | number>,
    },
    /**
     * @zh 默认值（非受控模式）
     * @en Default value (uncontrolled mode)
     */
    defaultValue: {
      type: [String, Number] as PropType<string | number>,
    },
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
     * @version 2.33.1
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 内部 input 元素的属性
     * @en Attributes of inner input elements
     * @version 2.52.0
     */
    inputAttrs: {
      type: Object,
    },
  },
  emits: {
    'update:modelValue': (_value: InputNumberValue) => true,
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @param { number | undefined } value
     * @param {Event} ev
     */
    'change': (_value: InputNumberValue, _ev: Event) => true,
    /**
     * @zh 输入框获取焦点时触发
     * @en Triggered when the input gets focus
     * @param {FocusEvent} ev
     */
    'focus': (_ev: FocusEvent) => true,
    /**
     * @zh 输入框失去焦点时触发
     * @en Triggered when the input box loses focus
     * @param {FocusEvent} ev
     */
    'blur': (_ev: FocusEvent) => true,
    /**
     * @zh 用户点击清除按钮时触发
     * @en Triggered when the user clicks the clear button
     * @param {Event} ev
     * @version 2.23.0
     */
    'clear': (_ev: Event) => true,
    /**
     * @zh 输入时触发
     * @en Triggered on input
     * @param { number | undefined } value
     * @param {string} inputValue
     * @param {Event} ev
     * @version 2.27.0
     */
    'input': (_value: InputNumberValue, _inputValue: string, _ev: Event) => true,
    /**
     * @zh 按下键盘时触发
     * @en Triggered on keydown
     * @param {MouseEvent} ev
     * @version 2.56.0
     */
    'keydown': (_ev: KeyboardEvent) => true,
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
  /**
   * @zh 数值增加图标
   * @en Plus
   * @slot plus
   */
  /**
   * @zh 数值减少图标
   * @en Minus
   * @slot minus
   */
  setup(props, { emit, slots }) {
    const { size, disabled, allowClear } = toRefs(props);
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
    const { mergedAllowClear } = useAllowClear(allowClear);
    const valueMode = ref<InputNumberValueMode>(
      typeof (props.modelValue ?? props.defaultValue) === 'string' ? 'string' : 'number',
    );
    const mergedPrecision = computed(() => {
      if (isNumber(props.precision)) {
        const decimal = `${props.step}`.split('.')[1];
        const stepPrecision = decimal?.length || 0;
        return Math.max(stepPrecision, props.precision);
      }
      return undefined;
    });

    const getNumberValue = (value: InputNumberValue) => {
      if (isUndefined(value) || value === null || value === '') {
        return undefined;
      }

      if (typeof value === 'number') {
        return Number.isNaN(value) ? undefined : value;
      }

      const normalizedValue = value.trim();
      if (!normalizedValue || /^[-.]$/.test(normalizedValue)) {
        return undefined;
      }

      const parsed = Number(props.parser?.(normalizedValue) ?? normalizedValue);
      return Number.isNaN(parsed) ? undefined : parsed;
    };

    const getStringValue = (number: number | undefined) => {
      if (!isNumber(number)) {
        return '';
      }

      const numString = mergedPrecision.value
        ? number.toFixed(mergedPrecision.value)
        : String(number);
      return props.formatter?.(numString) ?? numString;
    };

    const getDisplayValue = (value: InputNumberValue) => {
      if (typeof value === 'string') {
        const normalizedValue = value.trim();
        if (!normalizedValue || /^[-.]$/.test(normalizedValue)) {
          return value;
        }

        const parsed = getNumberValue(value);
        return isNumber(parsed) ? getStringValue(parsed) : value;
      }

      return getStringValue(value ?? undefined);
    };

    const getModelValue = (value: number | undefined): InputNumberValue => {
      if (valueMode.value === 'string') {
        return isUndefined(value) ? '' : String(value);
      }

      return value;
    };

    // inner input value to display
    const _value = ref(getDisplayValue(props.modelValue ?? props.defaultValue));

    const valueNumber = computed(() => {
      return getNumberValue(_value.value);
    });

    const isMin = ref(isNumber(valueNumber.value) && valueNumber.value <= props.min);
    const isMax = ref(isNumber(valueNumber.value) && valueNumber.value >= props.max);

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

      return isNumber(mergedPrecision.value) ? NP.round(value, mergedPrecision.value) : value;
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
      emit('update:modelValue', getModelValue(finalValue));
    };

    watch(
      () => [props.max, props.min],
      () => {
        handleExceedRange();
        updateNumberStatus(valueNumber.value);
      },
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
      const emittedValue = getModelValue(nextValue);
      emit('update:modelValue', emittedValue);
      emit('change', emittedValue, event);
    };

    const handleStepButton = (event: Event, method: StepMethods, needRepeat = false) => {
      event.preventDefault();

      if (props.readOnly) return;

      inputRef.value?.focus();

      nextStep(method, event);

      // 长按时持续触发
      if (needRepeat) {
        repeatTimer = window.setTimeout(
          () => (event.target as HTMLElement).dispatchEvent(event),
          repeatTimer ? SPEED : FIRST_DELAY,
        );
      }
    };

    const handleInput = (value: string, ev: Event) => {
      value = value.trim().replace(/。/g, '.');
      value = props.parser?.(value) ?? value;

      if (isNumber(Number(value)) || /^[-.]$/.test(value)) {
        _value.value = props.formatter?.(value) ?? value;
        updateNumberStatus(valueNumber.value);

        const emittedValue = getModelValue(valueNumber.value);
        emit('input', emittedValue, _value.value, ev);
        if (props.modelEvent === 'input') {
          emit('update:modelValue', emittedValue);
          emit('change', emittedValue, ev);
        }
      }
    };

    const handleFocus = (ev: FocusEvent) => {
      emit('focus', ev);
    };

    const handleChange = (value: string, ev: Event) => {
      if (ev instanceof MouseEvent && !value) {
        return;
      }

      handleExceedRange();
      emit('change', getModelValue(valueNumber.value), ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      emit('blur', ev);
    };

    const handleClear = (ev: Event) => {
      _value.value = '';
      const emittedValue = getModelValue(undefined);
      emit('update:modelValue', emittedValue);
      emit('change', emittedValue, ev);
      eventHandlers.value?.onChange?.(ev);
      emit('clear', ev);
    };

    const keyDownHandler = getKeyDownHandler(
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
      ]),
    );

    const onKeyDown = (event: KeyboardEvent) => {
      emit('keydown', event);
      if (!event.defaultPrevented) {
        keyDownHandler(event);
      }
    };

    watch(
      () => props.modelValue,
      (value: InputNumberValue) => {
        if (typeof value === 'string') {
          valueMode.value = 'string';
        } else if (typeof value === 'number') {
          valueMode.value = 'number';
        }

        const nextNumberValue = getNumberValue(value);
        if (value !== _value.value && nextNumberValue !== valueNumber.value) {
          _value.value = getDisplayValue(value);
          updateNumberStatus(nextNumberValue);
        } else if (value === '' && _value.value !== '') {
          _value.value = '';
          updateNumberStatus(undefined);
        }
      },
    );

    const renderSuffix = () => {
      if (props.readOnly) {
        return null;
      }
      return (
        <>
          {slots.suffix && <div class={`${prefixCls}-suffix`}>{slots.suffix?.()}</div>}
          <div class={`${prefixCls}-step`}>
            <button
              class={[
                `${prefixCls}-step-button`,
                {
                  [`${prefixCls}-step-button-disabled`]: mergedDisabled.value || isMax.value,
                },
              ]}
              type="button"
              tabindex="-1"
              disabled={mergedDisabled.value || isMax.value}
              onMousedown={(e) => handleStepButton(e, 'plus', true)}
              onMouseup={clearRepeatTimer}
              onMouseleave={clearRepeatTimer}
            >
              {slots.plus ? slots.plus?.() : <IconUp />}
            </button>
            <button
              class={[
                `${prefixCls}-step-button`,
                {
                  [`${prefixCls}-step-button-disabled`]: mergedDisabled.value || isMin.value,
                },
              ]}
              type="button"
              tabindex="-1"
              disabled={mergedDisabled.value || isMin.value}
              onMousedown={(e) => handleStepButton(e, 'minus', true)}
              onMouseup={clearRepeatTimer}
              onMouseleave={clearRepeatTimer}
            >
              {slots.minus ? slots.minus?.() : <IconDown />}
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
        <SDButton
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
        <SDButton
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
        <SDInput
          key={`__arco__${props.mode}`}
          v-slots={_slots}
          ref={inputRef}
          class={cls.value}
          type="text"
          allowClear={mergedAllowClear.value}
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
            ...props.inputAttrs,
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
