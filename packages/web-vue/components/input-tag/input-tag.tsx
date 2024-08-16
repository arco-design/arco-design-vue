import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  onMounted,
  TransitionGroup,
  toRefs,
  nextTick,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { INPUT_EVENTS, Size } from '../_utils/constant';
import { Backspace, Enter } from '../_utils/keycode';
import { getValueData } from './utils';
import Tag from '../tag';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { InputTagFieldNames, TagData } from './interface';
import { omit } from '../_utils/omit';
import pick from '../_utils/pick';
import ResizeObserver from '../_components/resize-observer';
import FeedbackIcon from '../_components/feedback-icon.vue';
import { useFormItem } from '../_hooks/use-form-item';
import { useSize } from '../_hooks/use-size';
import { isNull, isObject, isUndefined } from '../_utils/is';

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  closable: 'closable',
  tagProps: 'tagProps',
};

export default defineComponent({
  name: 'InputTag',
  inheritAttrs: false,
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: {
      type: Array as PropType<(string | number | TagData)[]>,
    },
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: Array as PropType<(string | number | TagData)[]>,
      default: () => [],
    },
    /**
     * @zh 输入框的值
     * @en The value of the input
     * @vModel
     */
    inputValue: String,
    /**
     * @zh 输入框的默认值（非受控状态）
     * @en The default value of the input (uncontrolled state)
     */
    defaultInputValue: {
      type: String,
      default: '',
    },
    /**
     * @zh 占位符
     * @en Placeholder
     */
    placeholder: String,
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
     * @zh 是否为只读模式
     * @en Whether it is read-only mode
     */
    readonly: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否允许清空
     * @en Whether to allow clear
     */
    allowClear: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 输入框的大小
     * @en The size of the input
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 最多展示的标签个数，`0` 表示不限制
     * @en The maximum number of tags displayed, `0` means unlimited
     */
    maxTagCount: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 是否保留输入框的内容
     * @en Whether to keep the content of the input box
     */
    retainInputValue: {
      type: [Boolean, Object] as PropType<
        boolean | { create?: boolean; blur?: boolean }
      >,
      default: false,
    },
    /**
     * @zh 格式化标签内容
     * @en Format tag content
     */
    formatTag: {
      type: Function as PropType<(data: TagData) => string>,
    },
    /**
     * @zh 是否仅创建唯一的值
     * @en Whether to create only unique values
     * @version 2.15.0
     */
    uniqueValue: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 自定义 `TagData` 中的字段
     * @en Customize fields in `TagData`
     * @version 2.22.0
     */
    fieldNames: {
      type: Object as PropType<InputTagFieldNames>,
    },
    /**
     * @zh 标签内容不换行
     * @en Tag content does not wrap
     * @version 2.56.1
     */
    tagNowrap: {
      type: Boolean,
      default: false,
    },
    // private
    baseCls: String,
    focused: Boolean,
    disabledInput: Boolean,
    uninjectFormItemContext: Boolean,
  },
  emits: {
    'update:modelValue': (value: (string | number | TagData)[]) => true,
    'update:inputValue': (inputValue: string) => true,
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @param {(string | number | TagData)[]} value
     * @param {Event} ev
     */
    'change': (value: (string | number | TagData)[], ev: Event) => true,
    /**
     * @zh 输入值发生改变时触发
     * @en Trigger when the input value changes
     * @param {string} inputValue
     * @param {Event} ev
     */
    'inputValueChange': (inputValue: string, ev: Event) => true,
    /**
     * @zh 按下回车键时触发
     * @en Triggered when the enter key is pressed
     * @param {string} inputValue
     * @param {KeyboardEvent} ev
     */
    'pressEnter': (inputValue: string, ev: KeyboardEvent) => true,
    /**
     * @zh 点击标签的删除按钮时触发
     * @en Triggered when the delete button of the label is clicked
     * @param {string | number} removed
     * @param {Event} ev
     */
    'remove': (removed: string | number, ev: Event) => true,
    /**
     * @zh 点击清除按钮时触发
     * @en Triggered when the clear button is clicked
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
   * @zh 后缀元素
   * @en Suffix
   * @slot suffix
   */
  /**
   * @zh 前缀元素
   * @en Prefix
   * @slot prefix
   */
  /**
   * @zh 输入框标签的显示内容
   * @en Display content of tag
   * @slot tag
   * @binding {TagData} data
   */
  setup(props, { emit, slots, attrs }) {
    const { size, disabled, error, uninjectFormItemContext, modelValue } =
      toRefs(props);
    const prefixCls = props.baseCls || getPrefixCls('input-tag');
    const inputRef = ref<HTMLInputElement>();
    const mirrorRef = ref<HTMLElement>();
    const {
      mergedSize: _mergedSize,
      mergedDisabled,
      mergedError,
      feedback,
      eventHandlers,
    } = useFormItem({
      size,
      disabled,
      error,
      uninject: uninjectFormItemContext?.value,
    });
    const { mergedSize } = useSize(_mergedSize);
    const mergedFieldNames = computed(() => ({
      ...DEFAULT_FIELD_NAMES,
      ...props.fieldNames,
    }));

    const _focused = ref(false);
    const _value = ref(props.defaultValue);
    const _inputValue = ref(props.defaultInputValue);
    const isComposition = ref(false);
    const compositionValue = ref('');

    const retainInputValue = computed(() => {
      if (isObject(props.retainInputValue)) {
        return {
          create: false,
          blur: false,
          ...props.retainInputValue,
        };
      }
      return {
        create: props.retainInputValue,
        blur: props.retainInputValue,
      };
    });

    const inputStyle = reactive({
      width: '12px',
    });

    const mergedFocused = computed(() => props.focused || _focused.value);

    const updateInputValue = (value: string, ev: Event) => {
      _inputValue.value = value;
      emit('update:inputValue', value);
      emit('inputValueChange', value, ev);
    };

    const handleComposition = (ev: CompositionEvent) => {
      const { value } = ev.target as HTMLInputElement;

      if (ev.type === 'compositionend') {
        isComposition.value = false;
        compositionValue.value = '';
        updateInputValue(value, ev);

        nextTick(() => {
          if (
            inputRef.value &&
            computedInputValue.value !== inputRef.value.value
          ) {
            inputRef.value.value = computedInputValue.value;
          }
        });
      } else {
        isComposition.value = true;
        compositionValue.value = computedInputValue.value + (ev.data ?? '');
      }
    };

    const computedValue = computed(() => props.modelValue ?? _value.value);
    const computedInputValue = computed(
      () => props.inputValue ?? _inputValue.value
    );

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = [];
      }
    });

    const handleMousedown = (e: MouseEvent) => {
      if (inputRef.value && e.target !== inputRef.value) {
        e.preventDefault();
        inputRef.value.focus();
      }
    };

    const handleInput = (ev: Event) => {
      const { value } = ev.target as HTMLInputElement;

      if (!isComposition.value) {
        updateInputValue(value, ev);

        nextTick(() => {
          if (
            inputRef.value &&
            computedInputValue.value !== inputRef.value.value
          ) {
            inputRef.value.value = computedInputValue.value;
          }
        });
      }
    };

    const valueData = computed(() =>
      getValueData(computedValue.value, mergedFieldNames.value)
    );

    const tags = computed(() => {
      if (props.maxTagCount > 0) {
        const invisibleTags = valueData.value.length - props.maxTagCount;
        if (invisibleTags > 0) {
          const result = valueData.value.slice(0, props.maxTagCount);
          const raw = {
            value: '__arco__more',
            label: `+${invisibleTags}...`,
            closable: false,
          };
          result.push({
            raw,
            ...raw,
          });
          return result;
        }
      }
      return valueData.value;
    });

    const updateValue = (value: (string | number | TagData)[], ev: Event) => {
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value, ev);
      eventHandlers.value?.onChange?.(ev);
    };

    const handleRemove = (value: string | number, index: number, e: Event) => {
      const newValue = computedValue.value?.filter((_, i) => i !== index);
      updateValue(newValue, e);
      emit('remove', value, e);
    };

    const handleClear = (e: MouseEvent) => {
      const newValue: any[] = [];
      updateValue(newValue, e);
      emit('clear', e);
    };

    const showClearBtn = computed(
      () =>
        !mergedDisabled.value &&
        !props.readonly &&
        props.allowClear &&
        Boolean(computedValue.value.length)
    );

    const handlePressEnter = (e: KeyboardEvent) => {
      if (computedInputValue.value) {
        e.preventDefault();
        if (
          props.uniqueValue &&
          computedValue.value?.includes(computedInputValue.value)
        ) {
          emit('pressEnter', computedInputValue.value, e);
          return;
        }
        const newValue = computedValue.value.concat(computedInputValue.value);
        updateValue(newValue, e);
        emit('pressEnter', computedInputValue.value, e);
        if (!retainInputValue.value.create) {
          updateInputValue('', e);
        }
      }
    };

    const handleFocus = (ev: FocusEvent) => {
      _focused.value = true;
      emit('focus', ev);
      eventHandlers.value?.onFocus?.(ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      _focused.value = false;
      if (!retainInputValue.value.blur && computedInputValue.value) {
        updateInputValue('', ev);
      }
      emit('blur', ev);
      eventHandlers.value?.onBlur?.(ev);
    };

    const getLastClosableIndex = () => {
      for (let i = valueData.value.length - 1; i >= 0; i--) {
        if (valueData.value[i].closable) {
          return i;
        }
      }
      return -1;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (mergedDisabled.value || props.readonly) {
        return;
      }
      const keyCode = e.key || e.code;
      if (
        !isComposition.value &&
        computedInputValue.value &&
        keyCode === Enter.key
      ) {
        handlePressEnter(e);
      }
      if (
        !isComposition.value &&
        tags.value.length > 0 &&
        !computedInputValue.value &&
        keyCode === Backspace.key
      ) {
        const lastIndex = getLastClosableIndex();
        if (lastIndex >= 0) {
          handleRemove(valueData.value[lastIndex].value, lastIndex, e);
        }
      }
    };

    const setInputWidth = (width: number) => {
      if (width > 12) {
        inputStyle.width = `${width}px`;
      } else {
        inputStyle.width = '12px';
      }
    };

    onMounted(() => {
      if (mirrorRef.value) {
        setInputWidth(mirrorRef.value.offsetWidth);
      }
    });

    const handleResize = () => {
      if (mirrorRef.value) {
        setInputWidth(mirrorRef.value.offsetWidth);
      }
    };

    watch(computedInputValue, (value) => {
      if (
        inputRef.value &&
        !isComposition.value &&
        value !== inputRef.value.value
      ) {
        inputRef.value.value = value;
      }
    });

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-size-${mergedSize.value}`,
      {
        [`${prefixCls}-disabled`]: mergedDisabled.value,
        [`${prefixCls}-disabled-input`]: props.disabledInput,
        [`${prefixCls}-error`]: mergedError.value,
        [`${prefixCls}-focus`]: mergedFocused.value,
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-has-tag`]: tags.value.length > 0,
        [`${prefixCls}-has-prefix`]: Boolean(slots.prefix),
        [`${prefixCls}-has-suffix`]:
          Boolean(slots.suffix) || showClearBtn.value || feedback.value,
        [`${prefixCls}-has-placeholder`]: !computedValue.value.length,
      },
    ]);

    const wrapperAttrs = computed(() => omit(attrs, INPUT_EVENTS));
    const inputAttrs = computed(() => pick(attrs, INPUT_EVENTS));

    const render = () => (
      <span
        class={cls.value}
        onMousedown={handleMousedown}
        {...wrapperAttrs.value}
      >
        <ResizeObserver onResize={handleResize}>
          <span ref={mirrorRef} class={`${prefixCls}-mirror`}>
            {tags.value.length > 0
              ? compositionValue.value || computedInputValue.value
              : compositionValue.value ||
                computedInputValue.value ||
                props.placeholder}
          </span>
        </ResizeObserver>
        {slots.prefix && (
          <span class={`${prefixCls}-prefix`}>{slots.prefix()}</span>
        )}
        <TransitionGroup
          tag="span"
          name="input-tag-zoom"
          // @ts-ignore
          class={[
            `${prefixCls}-inner`,
            {
              [`${prefixCls}-nowrap`]: props.tagNowrap,
            },
          ]}
        >
          {tags.value.map((item, index) => (
            <Tag
              key={`tag-${item.value}`}
              class={`${prefixCls}-tag`}
              closable={
                !mergedDisabled.value && !props.readonly && item.closable
              }
              visible
              nowrap={props.tagNowrap}
              {...item.tagProps}
              onClose={(ev: MouseEvent) => handleRemove(item.value, index, ev)}
            >
              {slots.tag?.({ data: item.raw }) ??
                props.formatTag?.(item.raw) ??
                item.label}
            </Tag>
          ))}
          <input
            {...inputAttrs.value}
            ref={inputRef}
            key="input-tag-input"
            class={`${prefixCls}-input`}
            style={inputStyle}
            placeholder={
              tags.value.length === 0 ? props.placeholder : undefined
            }
            disabled={mergedDisabled.value}
            readonly={props.readonly || props.disabledInput}
            onInput={handleInput}
            onKeydown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onCompositionstart={handleComposition}
            onCompositionupdate={handleComposition}
            onCompositionend={handleComposition}
          />
        </TransitionGroup>
        {showClearBtn.value && (
          <IconHover
            class={`${prefixCls}-clear-btn`}
            // @ts-ignore
            onClick={handleClear}
            onMousedown={(e: MouseEvent) => e.stopPropagation()}
          >
            <IconClose />
          </IconHover>
        )}
        {(slots.suffix || Boolean(feedback.value)) && (
          <span class={`${prefixCls}-suffix`}>
            {slots.suffix?.()}
            {Boolean(feedback.value) && <FeedbackIcon type={feedback.value} />}
          </span>
        )}
      </span>
    );

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
