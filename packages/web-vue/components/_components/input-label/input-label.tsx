import { computed, defineComponent, PropType } from 'vue';
import { omit } from '../../_utils/omit';
import { INPUT_EVENTS } from '../../_utils/constant';
import pick from '../../_utils/pick';
import { getPrefixCls } from '../../_utils/global-config';
import { useInput } from '../../_hooks/use-input';
import { TagData } from '../../input-tag/interface';

export default defineComponent({
  name: 'InputLabel',
  inheritAttrs: false,
  props: {
    modelValue: Object as PropType<TagData>,
    inputValue: String,
    enabledInput: Boolean,
    formatLabel: Function,
    placeholder: String,
    retainInputValue: Boolean,
    disabled: Boolean,
    baseCls: String,
    size: String,
    error: Boolean,
    // used for outer focused
    focused: Boolean,
  },
  emits: ['update:inputValue', 'inputValueChange', 'focus', 'blur'],
  setup(props, { attrs, emit, slots }) {
    const prefixCls = props.baseCls ?? getPrefixCls('input-label');

    const {
      inputRef,
      _focused,
      computedValue: computedInputValue,
      handleInput,
      handleComposition,
      handleFocus,
      handleBlur,
      handleMousedown,
    } = useInput(props, {
      emit,
      isInputValue: true,
    });

    const mergedFocused = computed(() => props.focused ?? _focused.value);

    const showInput = computed(
      () => (props.enabledInput && _focused.value) || !props.modelValue
    );

    const mergedPlaceholder = computed(() => {
      if (props.enabledInput && props.modelValue) {
        return props.modelValue.label;
      }

      return props.placeholder;
    });

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-size-${props.size}`,
      {
        [`${prefixCls}-search`]: props.enabledInput,
        [`${prefixCls}-focus`]: mergedFocused.value,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-error`]: props.error,
      },
    ]);

    const wrapperAttrs = computed(() => omit(attrs, INPUT_EVENTS));
    const inputAttrs = computed(() => pick(attrs, INPUT_EVENTS));

    const render = () => (
      <span
        {...wrapperAttrs.value}
        class={cls.value}
        onMousedown={handleMousedown}
      >
        {slots.prefix && (
          <span class={`${prefixCls}-prefix`}>{slots.prefix()}</span>
        )}
        <input
          {...inputAttrs.value}
          ref={inputRef}
          class={[
            `${prefixCls}-input`,
            {
              [`${prefixCls}-input-hidden`]: !showInput.value,
            },
          ]}
          value={computedInputValue.value}
          readonly={!props.enabledInput}
          placeholder={mergedPlaceholder.value}
          disabled={props.disabled}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCompositionstart={handleComposition}
          onCompositionupdate={handleComposition}
          onCompositionend={handleComposition}
        />
        <span
          class={[
            `${prefixCls}-value`,
            {
              [`${prefixCls}-value-hidden`]: showInput.value,
            },
          ]}
        >
          {slots.default?.({ data: props.modelValue }) ??
            props.formatLabel?.(props.modelValue) ??
            props.modelValue?.label}
        </span>
        {slots.suffix && (
          <span class={`${prefixCls}-suffix`}>{slots.suffix()}</span>
        )}
      </span>
    );

    return {
      inputRef,
      render,
    };
  },
  methods: {
    focus() {
      (this.inputRef as HTMLInputElement)?.focus();
    },
    blur() {
      (this.inputRef as HTMLInputElement)?.blur();
    },
  },
  render() {
    return this.render();
  },
});
