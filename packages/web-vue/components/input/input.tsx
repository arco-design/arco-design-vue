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
import { useFormItem } from '../_hooks/use-form-item';
import { useSize } from '../_hooks/use-size';
import { useCursor } from '../_hooks/use-cursor';

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
     * @zh 输入值的最大长度，errorOnly 属性在 2.12.0 版本添加
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
    /**
     * @zh 内部 input 元素的属性
     * @en Attributes of inner input elements
     * @version 2.27.0
     */
    inputAttrs: {
      type: Object,
    },
    // private
    type: {
      type: String as PropType<'text' | 'password'>,
      default: 'text',
    },
    /**
     * @zh 前置标签
     * @en Prepend
     */
    prepend: String,
    /**
     * @zh 后置标签
     * @en Append
     */
    append: String,
  },
  emits: {
    'update:modelValue': (value: string) => true,
    /**
     * @zh 用户输入时触发
     * @en Triggered when the user enters
     * @param {string} value
     * @param {Event} ev
     */
    'input': (value: string, ev: Event) => true,
    /**
     * @zh 仅在输入框失焦或按下回车时触发
     * @en Only triggered when the input box is out of focus or when you press Enter
     * @param {string} value
     * @param {Event} ev
     */
    'change': (value: string, ev: Event) => true,
    /**
     * @zh 用户按下回车时触发
     * @en Triggered when the user presses enter
     * @param {KeyboardEvent} ev
     */
    'pressEnter': (ev: KeyboardEvent) => true,
    /**
     * @zh 用户点击清除按钮时触发
     * @en Triggered when the user clicks the clear button
     * @param {MouseEvent} ev
     */
    'clear': (ev: MouseEvent) => true,
    /**
     * @zh 输入框获取焦点时触发
     * @en Triggered when the input box gets focus
     * @param {FocusEvent} ev
     */
    'focus': (ev: FocusEvent) => true,
    /**
     * @zh 输入框失去焦点时触发
     * @en Triggered when the input box loses focus
     * @param {FocusEvent} ev
     */
    'blur': (ev: FocusEvent) => true,
  },
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
    const [recordCursor, setCursor] = useCursor(inputRef);

    // 值相关
    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);
    let preValue = computedValue.value;

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = '';
      }
    });

    watch(computedValue, (value, oldValue) => {
      preValue = oldValue;
    });

    // 状态相关
    const focused = ref(false);
    const showClearBtn = computed(
      () =>
        props.allowClear &&
        !props.readonly &&
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

    const defaultMaxLength = computed(() => {
      const bytePerChar = getValueLength('a');
      return Math.floor(maxLength.value / bytePerChar);
    });

    const updateValue = (value: string) => {
      if (
        maxLength.value &&
        !maxLengthErrorOnly.value &&
        getValueLength(value) > maxLength.value
      ) {
        value =
          props.wordSlice?.(value, maxLength.value) ??
          value.slice(0, defaultMaxLength.value);
      }

      _value.value = value;
      emit('update:modelValue', value);
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
      emit('focus', ev);
      eventHandlers.value?.onFocus?.(ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      focused.value = false;
      emitChange(computedValue.value, ev);
      emit('blur', ev);
      eventHandlers.value?.onBlur?.(ev);
    };

    const handleComposition = (e: CompositionEvent) => {
      const { value, selectionStart, selectionEnd } =
        e.target as HTMLInputElement;

      if (e.type === 'compositionend') {
        isComposition.value = false;
        compositionValue.value = '';

        if (
          maxLength.value &&
          !maxLengthErrorOnly.value &&
          valueLength.value >= maxLength.value &&
          getValueLength(value) > maxLength.value &&
          selectionStart === selectionEnd
        ) {
          keepControl();
          return;
        }

        updateValue(value);
        emit('input', value, e);
        eventHandlers.value?.onInput?.(e);

        keepControl();
      } else {
        isComposition.value = true;
        compositionValue.value = computedValue.value + (e.data ?? '');
      }
    };

    const keepControl = () => {
      recordCursor();
      nextTick(() => {
        if (inputRef.value && computedValue.value !== inputRef.value.value) {
          inputRef.value.value = computedValue.value;
          setCursor();
        }
      });
    };

    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement;

      if (!isComposition.value) {
        if (
          maxLength.value &&
          !maxLengthErrorOnly.value &&
          valueLength.value >= maxLength.value &&
          getValueLength(value) > maxLength.value &&
          (e as InputEvent).inputType === 'insertText'
        ) {
          keepControl();
          return;
        }

        updateValue(value);
        emit('input', value, e);
        eventHandlers.value?.onInput?.(e);

        keepControl();
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
    const mergeInputAttrs = computed(() => {
      const attrs = {
        ...inputAttrs.value,
        ...props.inputAttrs,
      };
      if (mergedError.value) {
        attrs['aria-invalid'] = true;
      }
      return attrs;
    });

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
          {...mergeInputAttrs.value}
        />
        {showClearBtn.value && (
          <IconHover
            prefix={prefixCls}
            class={`${prefixCls}-clear-btn`}
            // @ts-ignore
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
      if (slots.prepend || slots.append || props.prepend || props.append) {
        return (
          <span class={outerCls.value} {...wrapperAttrs.value}>
            {(slots.prepend || props.prepend) && (
              <span class={`${prefixCls}-prepend`}>
                {slots.prepend ? slots.prepend() : props.prepend}
              </span>
            )}
            {renderInput(true)}
            {(slots.append || props.append) && (
              <span class={`${prefixCls}-append`}>
                {slots.append ? slots.append() : props.append}
              </span>
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
