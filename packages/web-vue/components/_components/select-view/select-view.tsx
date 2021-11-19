import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import type { Data, ValueData } from '../../_utils/types';
import { getPrefixCls } from '../../_utils/global-config';
import { INPUT_EVENTS, Size } from '../../_utils/constant';
import { isArray } from '../../_utils/is';
import InputTag from '../../input-tag';
import IconHover from '../icon-hover.vue';
import IconDown from '../../icon/icon-down';
import IconLoading from '../../icon/icon-loading';
import IconClose from '../../icon/icon-close';
import IconExpand from '../../icon/icon-expand';
import IconSearch from '../../icon/icon-search';
import { omit } from '../../_utils/omit';
import pick from '../../_utils/pick';

export default defineComponent({
  name: 'SelectView',
  inheritAttrs: false,
  props: {
    /**
     * 绑定值
     */
    modelValue: {
      type: [Object, Array] as PropType<ValueData | ValueData[]>,
    },
    inputValue: {
      type: String,
    },
    /**
     * 输入框的提示文字
     */
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<Size>,
      default: 'medium',
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    allowSearch: {
      type: Boolean,
      default: (props: Data) => isArray(props.modelValue),
    },
    maxTagCount: {
      type: Number,
      default: 0,
    },
    formatLabel: {
      type: Function,
    },
    retainInputValue: {
      type: Boolean,
      default: false,
    },
    // for JSX
    onChange: Function,
    onInputValueChange: Function,
    onFocus: Function,
    onBlur: Function,
    onRemove: Function,
    onClear: Function,
  },
  emits: [
    'update:modelValue',
    'update:inputValue',
    'change',
    'inputValueChange',
    'focus',
    'blur',
    'remove',
    'clear',
  ],
  setup(props, { emit, slots, attrs }) {
    const prefixCls = getPrefixCls('select-view');
    const inputRef = ref<HTMLInputElement>();
    const focused = ref(false);

    const validValue = computed(() => {
      // 纠正多选模式传入单值
      if (props.multiple && !isArray(props.modelValue)) {
        return props.modelValue ? [props.modelValue] : [];
      }
      // 纠正单选
      if (!props.multiple && isArray(props.modelValue)) {
        return props.modelValue[0];
      }
      return props.modelValue;
    });

    const mergedFocused = computed(() => focused.value || props.opened);
    const isEmptyValue = computed(() =>
      isArray(validValue.value)
        ? validValue.value.length === 0
        : !validValue.value
    );
    const canFocusInput = computed(
      () => props.allowSearch || props.allowCreate || isArray(validValue.value)
    );
    const showInput = computed(
      () => canFocusInput.value && mergedFocused.value
    );

    const showClearBtn = computed(
      () => props.allowClear && !props.disabled && !isEmptyValue.value
    );

    const mergedInputValue = computed(() => {
      // 存在inputValue时，优先展示
      if (props.inputValue) {
        return props.inputValue;
      }
      if (
        props.retainInputValue &&
        !isArray(validValue.value) &&
        validValue.value?.label
      ) {
        return props.formatLabel?.(validValue.value) ?? validValue.value.label;
      }
      return '';
    });

    const mergedPlaceholder = computed(() => {
      if (isArray(validValue.value)) {
        return '';
      }
      if (canFocusInput.value && !isEmptyValue.value) {
        return validValue.value?.label;
      }

      return props.placeholder;
    });

    // single模式input使用
    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      emit('inputValueChange', value, e);
    };

    // multiple模式input-tag使用
    const handleInputValueChange = (value: string, e: Event) => {
      emit('inputValueChange', value, e);
    };

    const handleMousedown = (e: MouseEvent) => {
      if (inputRef.value) {
        e.preventDefault();
        inputRef.value.focus();
      }
    };

    const handleFocus = () => {
      focused.value = true;
      emit('focus');
    };

    const handleBlur = () => {
      focused.value = false;
      emit('blur');
    };

    const handleRemove = (tag: string) => {
      emit('remove', tag);
    };

    const handleClear = (e: MouseEvent) => {
      emit('clear', e);
    };

    watch(
      () => props.opened,
      (value: boolean) => {
        if (inputRef.value) {
          if (value) {
            inputRef.value.focus();
          } else {
            inputRef.value.blur();
          }
        }
      }
    );

    const renderIcon = () => {
      if (props.loading) {
        return slots.loadingIcon?.() ?? <IconLoading />;
      }
      if (props.allowSearch && focused.value) {
        return slots.searchIcon?.() ?? <IconSearch />;
      }
      if (slots.arrowIcon) {
        return slots.arrowIcon();
      }
      if (canFocusInput.value) {
        return <IconExpand style={{ transform: 'rotate(-45deg)' }} />;
      }
      return <IconDown class={`${prefixCls}-arrow-icon`} />;
    };

    const renderSuffix = () => (
      <>
        {showClearBtn.value && (
          <span
            class={`${prefixCls}-clear-btn`}
            onClick={handleClear}
            onMousedown={(e) => e.stopPropagation()}
          >
            <IconHover>
              <IconClose />
            </IconHover>
          </span>
        )}
        <span class={`${prefixCls}-icon`}>{renderIcon()}</span>
      </>
    );

    const renderLabel = () => {
      if (isArray(validValue.value)) {
        return null;
      }

      return (
        slots.label?.({ data: validValue.value }) ??
        props.formatLabel?.(validValue.value) ??
        validValue.value?.label
      );
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${isArray(validValue.value) ? 'multiple' : 'single'}`,
      `${prefixCls}-size-${props.size}`,
      {
        [`${prefixCls}-search`]: props.allowSearch,
        [`${prefixCls}-opened`]: props.opened,
        [`${prefixCls}-focus`]: mergedFocused.value,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-error`]: props.error,
        [`${prefixCls}-bordered`]: props.bordered,
      },
    ]);

    const wrapperAttrs = omit(attrs, INPUT_EVENTS);
    const inputAttrs = pick(attrs, INPUT_EVENTS);

    const renderSingle = () => {
      return (
        <span class={cls.value} onMousedown={handleMousedown} {...wrapperAttrs}>
          {slots.prefix && (
            <span class={`${prefixCls}-prefix`}>{slots.prefix()}</span>
          )}
          <input
            ref="inputRef"
            class={[
              `${prefixCls}-input`,
              {
                [`${prefixCls}-input-hidden`]:
                  !showInput.value && !isEmptyValue.value,
              },
            ]}
            value={mergedInputValue.value}
            readonly={!canFocusInput.value}
            placeholder={mergedPlaceholder.value}
            disabled={props.disabled}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...inputAttrs}
          />
          <span
            class={[
              `${prefixCls}-value`,
              {
                [`${prefixCls}-value-hidden`]:
                  showInput.value || isEmptyValue.value,
              },
            ]}
          >
            {renderLabel()}
          </span>
          <span class={`${prefixCls}-suffix`}>{renderSuffix()}</span>
        </span>
      );
    };

    const renderMultiple = () => {
      return (
        <InputTag
          ref="inputRef"
          v-slots={{
            prefix: slots.prefix,
            suffix: renderSuffix,
            tag: slots.label,
          }}
          modelValue={validValue.value}
          formatTag={props.formatLabel}
          inputValue={props.inputValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          allowClear={props.allowClear}
          size={props.size}
          focused={mergedFocused.value}
          error={props.error}
          maxTagCount={props.maxTagCount}
          retainInputValue
          hideSuffixOnClear={true}
          onInputValueChange={handleInputValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClear={handleClear}
          onRemove={handleRemove}
          {...attrs}
        />
      );
    };

    const render = () => {
      if (isArray(validValue.value)) {
        return renderMultiple();
      }
      return renderSingle();
    };

    return {
      inputRef,
      render,
    };
  },
  methods: {
    focus() {
      if (this.inputRef) {
        this.inputRef.focus();
      }
    },
    blur() {
      if (this.inputRef) {
        this.inputRef.blur();
      }
    },
  },
  render() {
    return this.render();
  },
});
