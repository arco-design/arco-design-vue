import type { PropType } from 'vue';
import { computed, defineComponent, ref, nextTick, toRefs, watch } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { INPUT_EVENTS, Size } from '../_utils/constant';
import FeedbackIcon from '../_components/feedback-icon.vue';
import { Enter } from '../_utils/keycode';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { omit } from '../_utils/omit';
import pick from '../_utils/pick';
import { isFunction, isNull, isObject, isUndefined } from '../_utils/is';
import { EmitType } from '../_utils/types';
import { useFormItem } from '../_hooks/use-form-item';
import { useSize } from '../_hooks/use-size';

const INPUT_TYPES = ['text', 'password'] as const;
type InputType = typeof INPUT_TYPES[number];

export default defineComponent({
  name: 'Input',
  inheritAttrs: false,
  props: {
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: String,
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: String,
      default: '',
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
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为只读状态
     * @en Whether it is read-only
     */
    readonly: {
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
     * @zh 提示文字
     * @en Prompt text
     */
    placeholder: String,
    /**
     * @zh 输入值得最大长度，errorOnly 属性在 2.12.0 版本添加
     * @en Enter the maximum length of the value, the errorOnly attribute was added in version 2.12.0
     */
    maxLength: {
      type: [Number, Object] as PropType<
        number | { length: number; errorOnly?: boolean }
      >,
      default: 0,
    },
    /**
     * @zh 是否显示字数统计
     * @en Whether to display word count
     */
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 字符长度的计算方法
     * @en Calculation method of word length
     */
    wordLength: {
      type: Function as PropType<(value: string) => number>,
    },
    /**
     * @zh 字符截取方法，同 wordLength 一起使用
     * @en Character interception method, used together with wordLength
     * @version 2.12.0
     */
    wordSlice: {
      type: Function as PropType<(value: string, maxLength: number) => string>,
    },
    // private
    type: {
      type: String as PropType<InputType>,
      default: 'text',
    },
    // for JSX
    onInput: {
      type: [Function, Array] as PropType<
        EmitType<(value: string, ev: Event) => void>
      >,
    },
    onChange: {
      type: [Function, Array] as PropType<
        EmitType<(value: string, ev: Event) => void>
      >,
    },
    onPressEnter: {
      type: [Function, Array] as PropType<
        EmitType<(ev: KeyboardEvent) => void>
      >,
    },
    onClear: {
      type: [Function, Array] as PropType<EmitType<(ev: MouseEvent) => void>>,
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
     * @zh 用户输入时触发
     * @en Triggered when the user enters
     * @param {string} value
     */
    'input',
    /**
     * @zh 仅在输入框失焦或按下回车时触发
     * @en Only triggered when the input box is out of focus or when you press Enter
     * @param {string} value
     */
    'change',
    /**
     * @zh 用户按下回车时触发
     * @en Triggered when the user presses enter
     */
    'pressEnter',
    /**
     * @zh 用户点击清除按钮时触发
     * @en Triggered when the user clicks the clear button
     */
    'clear',
    /**
     * @zh 输入框获取焦点时触发
     * @en Triggered when the input box gets focus
     */
    'focus',
    /**
     * @zh 输入框失去焦点时触发
     * @en Triggered when the input box loses focus
     */
    'blur',
  ],
  /**
   * @zh 前缀元素
   * @en Prefix
   * @slot prefix
   */
  /**
   * @zh 后缀元素
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
  setup(props, { emit, slots, attrs }) {
    const { size, disabled, error, modelValue } = toRefs(props);
    const prefixCls = getPrefixCls('input');
    const inputRef = ref<HTMLInputElement>();
    const {
      mergedSize: _mergedSize,
      mergedDisabled,
      mergedError: _mergedError,
      feedback,
      eventHandlers,
    } = useFormItem({ size, disabled, error });
    const { mergedSize } = useSize(_mergedSize);

    // 值相关
    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = '';
      }
    });

    let preValue = computedValue.value;

    // 状态相关
    const focused = ref(false);
    const showClearBtn = computed(
      () =>
        props.allowClear &&
        !mergedDisabled.value &&
        Boolean(computedValue.value)
    );

    // 输入法相关
    const isComposition = ref(false);
    const compositionValue = ref('');

    const getValueLength = (value: string) => {
      if (isFunction(props.wordLength)) {
        return props.wordLength(value);
      }
      return value.length ?? 0;
    };

    const valueLength = computed(() => getValueLength(computedValue.value));

    const mergedError = computed(
      () =>
        _mergedError.value ||
        Boolean(
          isObject(props.maxLength) &&
            props.maxLength.errorOnly &&
            valueLength.value > maxLength.value
        )
    );

    const maxLengthErrorOnly = computed(
      () => isObject(props.maxLength) && Boolean(props.maxLength.errorOnly)
    );

    const maxLength = computed(() => {
      if (isObject(props.maxLength)) {
        return props.maxLength.length;
      }
      return props.maxLength;
    });

    const updateValue = (value: string, inner = true) => {
      if (
        maxLength.value &&
        !maxLengthErrorOnly.value &&
        getValueLength(value) > maxLength.value
      ) {
        value =
          props.wordSlice?.(value, maxLength.value) ??
          value.slice(0, maxLength.value);
      }

      _value.value = value;
      if (inner) {
        emit('update:modelValue', value);
      }
    };

    const handleMousedown = (e: MouseEvent) => {
      if (inputRef.value && e.target !== inputRef.value) {
        e.preventDefault();
        inputRef.value.focus();
      }
    };

    const emitChange = (value: string, ev: Event) => {
      if (value !== preValue) {
        preValue = value;
        emit('change', value, ev);
        eventHandlers.value?.onChange?.(ev);
      }
    };

    const handleFocus = (ev: FocusEvent) => {
      focused.value = true;
      preValue = computedValue.value;
      emit('focus', ev);
      eventHandlers.value?.onFocus?.(ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      focused.value = false;
      emit('blur', ev);
      eventHandlers.value?.onBlur?.(ev);
      emitChange(computedValue.value, ev);
    };

    const handleComposition = (e: CompositionEvent) => {
      const { value } = e.target as HTMLInputElement;

      if (e.type === 'compositionend') {
        isComposition.value = false;
        compositionValue.value = '';
        updateValue(value);
        emit('input', value, e);

        nextTick(() => {
          if (inputRef.value && computedValue.value !== inputRef.value.value) {
            inputRef.value.value = computedValue.value;
          }
        });
      } else {
        isComposition.value = true;
        compositionValue.value = computedValue.value + (e.data ?? '');
      }
    };

    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement;

      if (!isComposition.value) {
        updateValue(value);
        emit('input', value, e);
        eventHandlers.value?.onInput?.(e);

        nextTick(() => {
          if (inputRef.value && computedValue.value !== inputRef.value.value) {
            inputRef.value.value = computedValue.value;
          }
        });
      }
    };

    const handleClear = (ev: MouseEvent) => {
      updateValue('');
      emitChange('', ev);
      emit('clear', ev);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCode = e.key || e.code;
      if (!isComposition.value && keyCode === Enter.key) {
        emitChange(computedValue.value, e);
        emit('pressEnter', e);
      }
    };

    const outerCls = computed(() => [
      `${prefixCls}-outer`,
      `${prefixCls}-outer-size-${mergedSize.value}`,
      {
        [`${prefixCls}-outer-has-suffix`]: Boolean(slots.suffix),
        [`${prefixCls}-outer-disabled`]: mergedDisabled.value,
      },
    ]);

    const wrapperCls = computed(() => [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-error`]: mergedError.value,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
        [`${prefixCls}-focus`]: focused.value,
      },
    ]);

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-size-${mergedSize.value}`,
    ]);

    const wrapperAttrs = computed(() => omit(attrs, INPUT_EVENTS));
    const inputAttrs = computed(() => pick(attrs, INPUT_EVENTS));

    const renderInput = (hasOuter?: boolean) => (
      <span
        class={wrapperCls.value}
        onMousedown={handleMousedown}
        {...(!hasOuter ? wrapperAttrs.value : undefined)}
      >
        {slots.prefix && (
          <span class={`${prefixCls}-prefix`}>{slots.prefix()}</span>
        )}
        <input
          {...inputAttrs.value}
          ref={inputRef}
          class={cls.value}
          value={computedValue.value}
          type={props.type}
          placeholder={props.placeholder}
          readonly={props.readonly}
          disabled={mergedDisabled.value}
          onInput={handleInput}
          onKeydown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCompositionstart={handleComposition}
          onCompositionupdate={handleComposition}
          onCompositionend={handleComposition}
        />
        {showClearBtn.value && (
          <IconHover
            prefix={prefixCls}
            class={`${prefixCls}-clear-btn`}
            onClick={handleClear}
          >
            <IconClose />
          </IconHover>
        )}
        {(slots.suffix ||
          (Boolean(props.maxLength) && props.showWordLimit) ||
          Boolean(feedback.value)) && (
          <span
            class={[
              `${prefixCls}-suffix`,
              { [`${prefixCls}-suffix-has-feedback`]: feedback.value },
            ]}
          >
            {Boolean(props.maxLength) && props.showWordLimit && (
              <span class={`${prefixCls}-word-limit`}>
                {valueLength.value}/{maxLength.value}
              </span>
            )}
            {slots.suffix?.()}
            {Boolean(feedback.value) && <FeedbackIcon type={feedback.value} />}
          </span>
        )}
      </span>
    );

    const render = () => {
      if (slots.prepend || slots.append) {
        return (
          <span class={outerCls.value} {...wrapperAttrs.value}>
            {slots.prepend && (
              <span class={`${prefixCls}-prepend`}>{slots.prepend()}</span>
            )}
            {renderInput(true)}
            {slots.append && (
              <span class={`${prefixCls}-append`}>{slots.append()}</span>
            )}
          </span>
        );
      }
      return renderInput();
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
