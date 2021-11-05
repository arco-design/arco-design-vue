import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  onMounted,
  onUpdated,
  TransitionGroup,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { INPUT_EVENTS, Size, SIZES } from '../_utils/constant';
import { Enter } from '../_utils/keycode';
import { getValueData } from './utils';
import usePickSlots from '../_hooks/use-pick-slots';
import Tag from '../tag';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { TagData } from './interface';
import { omit } from '../_utils/omit';
import pick from '../_utils/pick';

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
      type: Array as PropType<Array<string | number | TagData>>,
    },
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: Array as PropType<Array<string | number | TagData>>,
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
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
      validator: (value: any) => {
        return SIZES.includes(value);
      },
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
     * @zh 创建标签后是否保留输入框的内容
     * @en Whether to keep the content of the input box after creating the label
     */
    retainInputValue: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 格式化标签内容
     * @en Format tag content
     */
    formatTag: {
      type: Function as PropType<(data: TagData) => string>,
    },
    // for JSX
    onChange: {
      type: Function as PropType<(value: string | number | TagData) => void>,
    },
    onInputValueChange: {
      type: Function as PropType<(inputValue: string) => void>,
    },
    onPressEnter: {
      type: Function as PropType<() => void>,
    },
    onRemove: {
      type: Function as PropType<(removed: string | number) => void>,
    },
    onClear: {
      type: Function as PropType<() => void>,
    },
    onFocus: {
      type: Function as PropType<() => void>,
    },
    onBlur: {
      type: Function as PropType<() => void>,
    },
    hideSuffixOnClear: {
      type: Boolean,
      default: false,
    },
    // private
    baseCls: String,
  },
  emits: [
    'update:modelValue',
    'update:inputValue',
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @property {Array<string | number | TagData>} value
     */
    'change',
    /**
     * @zh 输入值发生改变时触发
     * @en Trigger when the input value changes
     * @property {string} value
     */
    'inputValueChange',
    /**
     * @zh 按下回车键时触发
     * @en Triggered when the enter key is pressed
     * @property {string} inputValue
     */
    'pressEnter',
    /**
     * @zh 点击标签的删除按钮时触发
     * @en Triggered when the delete button of the label is clicked
     * @property {string | number} value
     */
    'remove',
    /**
     * @zh 点击清除按钮时触发
     * @en Triggered when the clear button is clicked
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
  setup(props, { emit, slots, attrs }) {
    const prefixCls = props.baseCls || getPrefixCls('input-tag');

    const inputRef = ref<HTMLInputElement>();
    const mirrorRef = ref<HTMLElement>();
    const focused = ref(false);
    const inputStyle = reactive({
      width: '12px',
    });
    const _value = ref(props.defaultValue);
    const _inputValue = ref(props.defaultInputValue);

    const isComposition = ref(false);
    const compositionValue = ref('');

    const updateInputValue = (value: string) => {
      _inputValue.value = value;
      emit('update:inputValue', value);
    };

    const handleComposition = (e: Event) => {
      const { value } = e.target as HTMLInputElement;

      if (e.type === 'compositionend') {
        isComposition.value = false;
        compositionValue.value = '';
        emit('inputValueChange', value, e);
        updateInputValue(value);
      } else {
        isComposition.value = true;
      }
    };

    const computedValue = computed(() => props.modelValue ?? _value.value);
    const computedInputValue = computed(
      () => props.inputValue ?? _inputValue.value
    );

    const prefixSlot = usePickSlots(slots, 'prefix');
    const suffixSlot = usePickSlots(slots, 'suffix');

    const hasSuffix = computed(() => suffixSlot.value);

    const handleMousedown = (e: MouseEvent) => {
      if (inputRef.value && e.target !== inputRef.value) {
        e.preventDefault();
        inputRef.value.focus();
      }
    };

    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement;

      if (!isComposition.value) {
        emit('inputValueChange', value, e);
        updateInputValue(value);
      } else {
        compositionValue.value = value;
      }
    };

    const tags = computed(() => {
      const valueData = getValueData(computedValue.value);

      if (props.maxTagCount > 0) {
        const invisibleTags = valueData.length - props.maxTagCount;
        if (invisibleTags > 0) {
          const result = valueData.slice(0, props.maxTagCount);
          result.push({
            value: 'more',
            label: `+${invisibleTags}...`,
            closable: false,
          });
          return result;
        }
      }
      return valueData;
    });

    const handleTagClose = (value: string | number) => {
      const newValue = computedValue.value.filter((v) => v !== value);
      _value.value = newValue;
      emit('remove', value);
      emit('update:modelValue', newValue);
      emit('change', newValue);
    };

    const handleClear = (e: Event) => {
      const newValue: any[] = [];
      _value.value = newValue;
      emit('clear', e);
      emit('update:modelValue', newValue);
      emit('change', newValue);
    };

    const showClearBtn = computed(
      () =>
        props.allowClear &&
        !props.disabled &&
        Boolean(computedValue.value.length)
    );

    const handlePressEnter = () => {
      const newValue = computedValue.value.concat(computedInputValue.value);
      _value.value = newValue;
      emit('update:modelValue', newValue);
      emit('change', newValue);
      emit('pressEnter', computedInputValue.value);

      if (!props.retainInputValue) {
        _inputValue.value = '';
        emit('update:inputValue', '');
        emit('inputValueChange', '');
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

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCode = e.code || e.key;
      if (
        !isComposition.value &&
        computedInputValue.value &&
        keyCode === Enter.code
      ) {
        handlePressEnter();
      }
    };

    const setInputWidth = (width: number) => {
      if (width > 12) {
        inputStyle.width = `${width}px`;
      } else {
        inputStyle.width = '12px';
      }
    };

    onUpdated(() => {
      if (mirrorRef.value) {
        setInputWidth(mirrorRef.value.offsetWidth);
      }
    });

    onMounted(() => {
      if (mirrorRef.value) {
        setInputWidth(mirrorRef.value.offsetWidth);
      }
    });

    watch(computedInputValue, (value) => {
      if (inputRef.value && value !== inputRef.value.value) {
        inputRef.value.value = value;
      }
    });

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-size-${props.size}`,
      {
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-error`]: props.error,
        [`${prefixCls}-focus`]: focused.value,
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-has-tag`]: tags.value.length > 0,
        [`${prefixCls}-has-prefix`]: Boolean(prefixSlot.value),
        [`${prefixCls}-has-suffix`]: hasSuffix.value || showClearBtn.value,
        [`${prefixCls}-has-placeholder`]: !computedValue.value.length,
      },
    ]);

    const wrapperAttrs = omit(attrs, INPUT_EVENTS);
    const inputAttrs = pick(attrs, INPUT_EVENTS);

    const render = () => (
      <span class={cls.value} onMousedown={handleMousedown} {...wrapperAttrs}>
        <span ref={mirrorRef} class={`${prefixCls}-mirror`}>
          {tags.value.length > 0
            ? computedInputValue.value
            : computedInputValue.value || props.placeholder}
        </span>
        {slots.prefix && (
          <span class={`${prefixCls}-prefix`}>{slots.prefix()}</span>
        )}
        <TransitionGroup tag="span" name="zoom-in" class={`${prefixCls}-inner`}>
          {tags.value.map((item) => (
            <Tag
              key={`tag-${item.value}`}
              class={`${prefixCls}-tag`}
              closable={item.closable}
              visible
              onClose={() => handleTagClose(item.value)}
            >
              {slots.tag?.({ data: item }) ??
                props.formatTag?.(item) ??
                item.label}
            </Tag>
          ))}
          <input
            ref={inputRef}
            key="input-tag-input"
            class={`${prefixCls}-input`}
            style={inputStyle}
            value={computedInputValue.value}
            placeholder={
              tags.value.length === 0 ? props.placeholder : undefined
            }
            disabled={props.disabled}
            readonly={props.readonly}
            onInput={handleInput}
            onKeydown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onCompositionstart={handleComposition}
            onCompositionupdate={handleComposition}
            onCompositionend={handleComposition}
            {...inputAttrs}
          />
        </TransitionGroup>
        {showClearBtn.value && (
          <IconHover
            class={`${prefixCls}-clear-btn`}
            onClick={handleClear}
            onMousedown={(e: Event) => e.stopPropagation()}
          >
            <IconClose />
          </IconHover>
        )}
        {hasSuffix.value && (
          <span
            class={[
              `${prefixCls}-suffix`,
              {
                [`${prefixCls}-suffix-hide-on-clear`]:
                  props.hideSuffixOnClear && showClearBtn.value,
              },
            ]}
          >
            {slots.suffix?.()}
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
