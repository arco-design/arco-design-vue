import type { ComponentPublicInstance, PropType } from 'vue';
import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import type { Data } from '../../_utils/types';
import { getPrefixCls } from '../../_utils/global-config';
import { Size } from '../../_utils/constant';
import { isArray } from '../../_utils/is';
import InputLabel from '../input-label/input-label';
import InputTag from '../../input-tag';
import IconHover from '../icon-hover.vue';
import IconDown from '../../icon/icon-down';
import IconLoading from '../../icon/icon-loading';
import IconClose from '../../icon/icon-close';
import IconExpand from '../../icon/icon-expand';
import IconSearch from '../../icon/icon-search';
import { TagData } from '../../input-tag/interface';

export default defineComponent({
  name: 'SelectView',
  props: {
    modelValue: {
      type: [Object, Array] as PropType<TagData | TagData[]>,
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
  },
  emits: ['remove', 'clear'],
  setup(props, { emit, slots, attrs }) {
    const prefixCls = getPrefixCls('select-view');

    const { opened } = toRefs(props);

    const componentRef = ref<ComponentPublicInstance>();
    const inputRef = computed<HTMLInputElement>(
      // @ts-ignore
      () => componentRef.value?.inputRef
    );

    const validValue = computed(() => {
      // transform to array
      if (props.multiple && !isArray(props.modelValue)) {
        return props.modelValue ? [props.modelValue] : [];
      }
      // transform to object
      if (!props.multiple && isArray(props.modelValue)) {
        return props.modelValue[0];
      }
      return props.modelValue;
    });

    const isEmptyValue = computed(() =>
      isArray(validValue.value)
        ? validValue.value.length === 0
        : !validValue.value
    );
    const enabledInput = computed(() => props.allowSearch || props.allowCreate);
    const showClearBtn = computed(
      () => props.allowClear && !props.disabled && !isEmptyValue.value
    );

    const handleRemove = (tag: string) => {
      emit('remove', tag);
    };

    const handleClear = (ev: MouseEvent) => {
      emit('clear', ev);
    };

    const renderIcon = () => {
      if (props.loading) {
        return slots.loadingIcon?.() ?? <IconLoading />;
      }
      if (props.allowSearch && props.opened) {
        return slots.searchIcon?.() ?? <IconSearch />;
      }
      if (slots.arrowIcon) {
        return slots.arrowIcon();
      }
      if (props.multiple || enabledInput.value) {
        return <IconExpand style={{ transform: 'rotate(-45deg)' }} />;
      }
      return <IconDown class={`${prefixCls}-arrow-icon`} />;
    };

    const renderSuffix = () => (
      <>
        {showClearBtn.value && (
          <IconHover
            class={`${prefixCls}-clear-btn`}
            onClick={handleClear}
            onMousedown={(e) => e.stopPropagation()}
          >
            <IconClose />
          </IconHover>
        )}
        <span class={`${prefixCls}-icon`}>{renderIcon()}</span>
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
      if (isArray(validValue.value)) {
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
            modelValue={validValue.value}
            inputValue={props.inputValue}
            formatTag={props.formatLabel}
            focused={props.opened}
            placeholder={props.placeholder}
            disabled={props.disabled}
            size={props.size}
            error={props.error}
            maxTagCount={props.maxTagCount}
            disabledInput={!props.allowSearch && !props.allowCreate}
            retainInputValue
            onRemove={handleRemove}
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
          modelValue={validValue.value}
          inputValue={props.inputValue}
          focused={props.opened}
          placeholder={props.placeholder}
          disabled={props.disabled}
          size={props.size}
          error={props.error}
          formatLabel={props.formatLabel}
          enabledInput={enabledInput.value}
        />
      );
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
