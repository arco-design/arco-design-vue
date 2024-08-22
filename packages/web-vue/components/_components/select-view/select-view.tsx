import type { ComponentPublicInstance, PropType } from 'vue';
import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import type { Data } from '../../_utils/types';
import { getPrefixCls } from '../../_utils/global-config';
import { Size } from '../../_utils/constant';
import { isArray } from '../../_utils/is';
import FeedbackIcon from '../feedback-icon.vue';
import InputLabel from '../input-label/input-label';
import InputTag from '../../input-tag';
import IconHover from '../icon-hover.vue';
import IconDown from '../../icon/icon-down';
import IconLoading from '../../icon/icon-loading';
import IconClose from '../../icon/icon-close';
import IconSearch from '../../icon/icon-search';
import { useFormItem } from '../../_hooks/use-form-item';
import { useSize } from '../../_hooks/use-size';
import { SelectViewValue } from './interface';

export default defineComponent({
  name: 'SelectView',
  props: {
    modelValue: {
      type: Array as PropType<SelectViewValue[]>,
      required: true,
    },
    inputValue: String,
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
    tagNowrap: {
      type: Boolean,
      default: false,
    },
    retainInputValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['remove', 'clear', 'focus', 'blur'],
  setup(props, { emit, slots }) {
    const { size, disabled, error } = toRefs(props);
    const prefixCls = getPrefixCls('select-view');
    const {
      feedback,
      eventHandlers,
      mergedDisabled,
      mergedSize: _mergedSize,
      mergedError,
    } = useFormItem({
      size,
      disabled,
      error,
    });
    const { mergedSize } = useSize(_mergedSize);

    const { opened } = toRefs(props);

    const componentRef = ref<ComponentPublicInstance>();
    const inputRef = computed<HTMLInputElement>(
      // @ts-ignore
      () => componentRef.value?.inputRef
    );

    const isEmptyValue = computed(() => props.modelValue.length === 0);
    const enabledInput = computed(() => props.allowSearch || props.allowCreate);
    const showClearBtn = computed(
      () => props.allowClear && !props.disabled && !isEmptyValue.value
    );

    const handleFocus = (ev: FocusEvent) => {
      emit('focus', ev);
      eventHandlers.value?.onFocus?.(ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      emit('blur', ev);
      eventHandlers.value?.onBlur?.(ev);
    };

    const handleRemove = (tag: string) => {
      emit('remove', tag);
    };

    const handleClear = (ev: MouseEvent) => {
      emit('clear', ev);
    };

    const renderIcon = () => {
      if (props.loading) {
        return slots['loading-icon']?.() ?? <IconLoading />;
      }
      if (props.allowSearch && props.opened) {
        return slots['search-icon']?.() ?? <IconSearch />;
      }
      if (slots['arrow-icon']) {
        return slots['arrow-icon']();
      }
      return <IconDown class={`${prefixCls}-arrow-icon`} />;
    };

    const renderSuffix = () => (
      <>
        {showClearBtn.value && (
          <IconHover
            class={`${prefixCls}-clear-btn`}
            onClick={handleClear}
            onMousedown={(ev: MouseEvent) => ev.stopPropagation()}
          >
            <IconClose />
          </IconHover>
        )}
        <span class={`${prefixCls}-icon`}>{renderIcon()}</span>
        {Boolean(feedback.value) && <FeedbackIcon type={feedback.value} />}
      </>
    );

    watch(opened, (opened) => {
      if (
        !opened &&
        inputRef.value &&
        inputRef.value.isSameNode(document.activeElement)
      ) {
        inputRef.value.blur();
      }
    });

    const cls = computed(() => [
      `${prefixCls}-${props.multiple ? 'multiple' : 'single'}`,
      {
        [`${prefixCls}-opened`]: props.opened,
        [`${prefixCls}-borderless`]: !props.bordered,
      },
    ]);

    const render = () => {
      if (props.multiple) {
        return (
          <InputTag
            ref={componentRef}
            v-slots={{
              prefix: slots.prefix,
              suffix: renderSuffix,
              tag: slots.label,
            }}
            baseCls={prefixCls}
            class={cls.value}
            modelValue={props.modelValue}
            inputValue={props.inputValue}
            focused={props.opened}
            placeholder={props.placeholder}
            disabled={mergedDisabled.value}
            size={mergedSize.value}
            error={mergedError.value}
            maxTagCount={props.maxTagCount}
            disabledInput={!props.allowSearch && !props.allowCreate}
            tagNowrap={props.tagNowrap}
            retainInputValue
            uninjectFormItemContext
            onRemove={handleRemove}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        );
      }
      return (
        <InputLabel
          ref={componentRef}
          v-slots={{
            default: slots.label,
            prefix: slots.prefix,
            suffix: renderSuffix,
          }}
          baseCls={prefixCls}
          class={cls.value}
          modelValue={props.modelValue[0]}
          inputValue={props.inputValue}
          focused={props.opened}
          placeholder={props.placeholder}
          disabled={mergedDisabled.value}
          size={mergedSize.value}
          error={mergedError.value}
          enabledInput={enabledInput.value}
          uninjectFormItemContext
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    };

    return {
      inputRef,
      handleFocus,
      handleBlur,
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
