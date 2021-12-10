import type { PropType } from 'vue';
import { computed, defineComponent, ref, nextTick, watch } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { INPUT_EVENTS, Size, SIZES } from '../_utils/constant';
import { Enter } from '../_utils/keycode';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { omit } from '../_utils/omit';
import pick from '../_utils/pick';
import { isFunction } from '../_utils/is';
import { EmitType } from '../_utils/types';

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
     * @values 'mini', 'small', 'medium', 'large'
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
      validator: (value: any) => {
        return SIZES.includes(value);
      },
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
     * @zh 输入值得最大长度
     * @en Enter the maximum length of the value
     */
    maxLength: Number,
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
     */
    'input',
    /**
     * @zh 仅在输入框失焦或按下回车时触发
     * @en Only triggered when the input box is out of focus or when you press Enter
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
    const prefixCls = getPrefixCls('input');
    const inputRef = ref<HTMLInputElement>();

    // 值相关
    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);

    // 状态相关
    const focused = ref(false);
    const showClearBtn = computed(
      () => props.allowClear && !props.disabled && Boolean(computedValue.value)
    );

    // 输入法相关
    const isComposition = ref(false);
    const compositionValue = ref('');

    const updateValue = (value: string, inner = true) => {
      if (props.maxLength && value.length > props.maxLength) {
        value = value.slice(0, props.maxLength);
      }

      _value.value = value;
      if (inner) {
        emit('update:modelValue', value);
      }

      nextTick(() => {
        if (inputRef.value && computedValue.value !== inputRef.value.value) {
          inputRef.value.value = computedValue.value;
        }
      });
    };

    const handleMousedown = (e: MouseEvent) => {
      if (inputRef.value && e.target !== inputRef.value) {
        e.preventDefault();
        inputRef.value.focus();
      }
    };

    const handleFocus = (e: FocusEvent) => {
      focused.value = true;
      emit('focus', e);
    };

    const handleBlur = (e: FocusEvent) => {
      focused.value = false;
      emit('change', computedValue.value, e);
      emit('blur', e);
    };

    const handleComposition = (e: CompositionEvent) => {
      const { value } = e.target as HTMLInputElement;

      if (e.type === 'compositionend') {
        isComposition.value = false;
        compositionValue.value = '';
        emit('input', value, e);
        updateValue(value);
      } else {
        isComposition.value = true;
        compositionValue.value = computedValue.value + (e.data ?? '');
      }
    };

    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement;

      if (!isComposition.value) {
        emit('input', value, e);
        updateValue(value);
      }
    };

    const handleClear = (ev: MouseEvent) => {
      emit('clear', ev);
      updateValue('');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCode = e.key || e.code;
      if (!isComposition.value && keyCode === Enter.key) {
        emit('change', computedValue.value, e);
        emit('pressEnter', e);
      }
    };

    // modelValue发生改变时，更新内部值
    watch(
      () => props.modelValue,
      (value: string | undefined) => {
        if (value !== computedValue.value) {
          updateValue(value ?? '', false);
        }
      }
    );

    const outerCls = computed(() => [
      `${prefixCls}-outer`,
      `${prefixCls}-outer-size-${props.size}`,
      {
        [`${prefixCls}-outer-has-suffix`]: Boolean(slots.suffix),
        [`${prefixCls}-outer-disabled`]: props.disabled,
      },
    ]);

    const valueLength = computed(() => {
      if (isFunction(props.wordLength)) {
        return props.wordLength(computedValue.value);
      }
      return computedValue.value?.length ?? 0;
    });

    const wrapperCls = computed(() => [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-error`]: props.error,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-focus`]: focused.value,
      },
    ]);

    const cls = computed(() => [prefixCls, `${prefixCls}-size-${props.size}`]);

    const wrapperAttrs = computed(() => omit(attrs, INPUT_EVENTS));
    const inputAttrs = computed(() => pick(attrs, INPUT_EVENTS));

    const renderInput = () => (
      <span
        {...wrapperAttrs.value}
        class={wrapperCls.value}
        onMousedown={handleMousedown}
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
          disabled={props.disabled}
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
        {(slots.suffix || (props.maxLength && props.showWordLimit)) && (
          <span class={`${prefixCls}-suffix`}>
            {props.maxLength && props.showWordLimit && (
              <span class={`${prefixCls}-word-limit`}>
                {valueLength.value}/{props.maxLength}
              </span>
            )}
            {slots.suffix?.()}
          </span>
        )}
      </span>
    );

    const render = () => {
      if (slots.prepend || slots.append) {
        return (
          <span class={outerCls.value}>
            {slots.prepend && (
              <span class={`${prefixCls}-prepend`}>{slots.prepend()}</span>
            )}
            {renderInput()}
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
