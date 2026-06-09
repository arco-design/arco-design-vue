import {
  computed,
  defineComponent,
  PropType,
  ref,
  toRefs,
  ComponentPublicInstance,
  onMounted,
  watch,
  nextTick,
  toRef,
} from 'vue';

import ResizeObserver from '../_components/resize-observer';
import { useAllowClear } from '../_hooks/use-allow-clear';
import { useFormItem } from '../_hooks/use-form-item';
import { getPrefixCls } from '../_utils/global-config';
import { isFunction, isNull, isUndefined } from '../_utils/is';
import SDInput from '../input';
import { useSelect } from '../select/hooks/use-select';
import { SelectOptionData, SelectOptionGroup, SelectOptionInfo } from '../select/interface';
import SelectDropdown from '../select/select-dropdown.vue';
import { getKeyFromValue } from '../select/utils';
import SDTextarea from '../textarea';
import { getSizeStyles } from '../textarea/utils';
import Trigger from '../trigger';
import { MeasureInfo } from './interface';
import { getLastMeasureIndex, getTextBeforeSelection, isValidSearch } from './utils';

export default defineComponent({
  name: 'Mention',
  inheritAttrs: false,
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
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
     * @zh 用于自动补全的数据
     * @en Data for automatic completion
     */
    data: {
      type: Array as PropType<(string | number | SelectOptionData | SelectOptionGroup)[]>,
      default: () => [],
    },
    /**
     * @zh 触发自动补全的关键字
     * @en Keywords that trigger auto-completion
     */
    prefix: {
      type: [String, Array] as PropType<string | string[]>,
      default: '@',
    },
    /**
     * @zh 选中项的前后分隔符
     * @en Before and after the selected item separator
     */
    split: {
      type: String,
      default: ' ',
    },
    /**
     * @zh 输入框或文本域
     * @en default input or textarea
     */
    type: {
      type: String as PropType<'input' | 'textarea'>,
      default: 'input',
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
     * @zh 是否允许清空输入框
     * @en Whether to allow the input to be cleared
     * @version 2.23.0
     */
    allowClear: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (_value: string) => true,
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @property {string} value
     */
    'change': (_value: string) => true,
    /**
     * @zh 动态搜索时触发，2.47.0 版本增加 prefix 参数
     * @en Trigger on dynamic search prefix, version 2.47.0 adds prefix param
     * @property {string} value
     * @property {string} prefix
     */
    'search': (_value: string, _prefix: string) => true,
    /**
     * @zh 选择下拉选项时触发
     * @en Triggered when the drop-down option is selected
     * @property {string | number | Record<string, any> | undefined} value
     */
    'select': (_value: string | number | Record<string, any> | undefined) => true,
    /**
     * @zh 用户点击清除按钮时触发
     * @en Triggered when the user clicks the clear button
     * @version 2.23.0
     */
    'clear': (_ev: Event) => true,
    /**
     * @zh 文本框获取焦点时触发
     * @en Emitted when the text box gets focus
     * @param {FocusEvent} ev
     * @version 2.42.0
     */
    'focus': (_ev: FocusEvent) => true,
    /**
     * @zh 文本框失去焦点时触发
     * @en Emitted when the text box loses focus
     * @param {FocusEvent} ev
     * @version 2.42.0
     */
    'blur': (_ev: FocusEvent) => true,
  },
  /**
   * @zh 选项内容
   * @en Display content of options
   * @slot option
   * @binding {OptionInfo} data
   * @version 2.13.0
   */
  setup(props, { emit, attrs, slots }) {
    const prefixCls = getPrefixCls('mention');
    const { mergedAllowClear } = useAllowClear(toRef(props, 'allowClear'));

    let styleDeclaration: CSSStyleDeclaration;

    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled: toRef(props, 'disabled'),
    });

    const { data, modelValue } = toRefs(props);
    const dropdownRef = ref();
    const optionRefs = ref<Record<string, HTMLElement>>({});
    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = '';
      }
    });

    const computedValueKeys = computed(() =>
      computedValue.value ? [getKeyFromValue(computedValue.value)] : [],
    );
    const measureInfo = ref<MeasureInfo>({
      measuring: false,
      location: -1,
      prefix: '',
      text: '',
    });

    const resetMeasureInfo = () => {
      measureInfo.value = {
        measuring: false,
        location: -1,
        prefix: '',
        text: '',
      };
    };

    const inputRef = ref<HTMLElement>();

    const measureText = computed(() => measureInfo.value.text);
    const filterOption = ref(true);

    const handleInput = (value: string, e: Event) => {
      const text = getTextBeforeSelection(e.target as HTMLInputElement);
      const lastMeasure = getLastMeasureIndex(text, props.prefix);
      if (lastMeasure.location > -1) {
        const measureText = text.slice(lastMeasure.location + lastMeasure.prefix.length);
        if (isValidSearch(measureText, props.split)) {
          _popupVisible.value = true;
          measureInfo.value = {
            measuring: true,
            text: measureText,
            ...lastMeasure,
          };
          emit('search', measureText, lastMeasure.prefix);
        } else if (measureInfo.value.location > -1) {
          resetMeasureInfo();
        }
      } else if (measureInfo.value.location > -1) {
        resetMeasureInfo();
      }
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value);
      eventHandlers.value?.onChange?.();
    };

    const handleClear = (ev: Event) => {
      _value.value = '';
      emit('update:modelValue', '');
      emit('change', '');
      eventHandlers.value?.onChange?.();
      emit('clear', ev);
    };

    const _popupVisible = ref(false);
    const computedPopupVisible = computed(
      () => _popupVisible.value && measureInfo.value.measuring && validOptionInfos.value.length > 0,
    );

    const handleResize = () => {
      mirrorStyle.value = getSizeStyles(styleDeclaration);
    };

    const handlePopupVisibleChange = (popupVisible: boolean) => {
      _popupVisible.value = popupVisible;
    };

    const handleSelect = (key: string, _e: Event) => {
      const { value } = optionInfoMap.get(key) ?? {};
      const measureStart = measureInfo.value.location;
      const measureEnd = measureInfo.value.location + measureInfo.value.text.length;
      let head = _value.value.slice(0, measureStart);
      let tail = _value.value.slice(measureEnd + 1);
      // 如过匹配内容之前或者之后已经存在内容，需要添加分割字符
      head += !head || head.endsWith(props.split) || head.endsWith('\n') ? '' : props.split;
      tail =
        (!tail || tail.startsWith(props.split) || tail.startsWith('\n') ? '' : props.split) + tail;

      const match = `${measureInfo.value.prefix}${value}`;
      const nextValue = `${head}${match}${tail}`;

      _value.value = nextValue;
      emit('select', value as string | number | Record<string, any> | undefined);
      emit('update:modelValue', nextValue);
      emit('change', nextValue);
      resetMeasureInfo();
      eventHandlers.value?.onChange?.();
    };

    const {
      validOptions,
      optionInfoMap,
      validOptionInfos,
      activeKey,
      setActiveKey,
      handleKeyDown,
    } = useSelect({
      options: data,
      inputValue: measureText,
      filterOption,
      popupVisible: computedPopupVisible,
      valueKeys: computedValueKeys,
      dropdownRef,
      optionRefs,
      onSelect: handleSelect,
      onPopupVisibleChange: handlePopupVisibleChange,
      enterToOpen: false,
    });

    const mirrorStyle = ref();

    onMounted(() => {
      // @ts-ignore
      if (props.type === 'textarea' && inputRef.value?.textareaRef) {
        // @ts-ignore
        styleDeclaration = window.getComputedStyle(inputRef.value.textareaRef);
        mirrorStyle.value = getSizeStyles(styleDeclaration);
      }
    });

    const getOptionContentFunc = (item: SelectOptionInfo) => {
      if (isFunction(slots.option) && item.value) {
        const optionInfo = optionInfoMap.get(item.key);
        const optionSlot = slots.option;
        return () => optionSlot({ data: optionInfo });
      }
      return () => item.label;
    };

    const optionPrefixCls = getPrefixCls('select-option');

    const renderOption = (item: SelectOptionInfo) => {
      const isActive = activeKey.value === item.key;

      const cls = [
        optionPrefixCls,
        {
          [`${optionPrefixCls}-active`]: isActive,
          [`${optionPrefixCls}-disabled`]: item.disabled,
        },
      ];

      return (
        <li
          ref={(el: Element | ComponentPublicInstance | null) => {
            const element = (el as (ComponentPublicInstance & { $el?: Element }) | null)?.$el ?? el;
            if (element instanceof HTMLElement) {
              optionRefs.value[item.key] = element;
            }
          }}
          key={item.key}
          class={cls}
          onClick={(ev: MouseEvent) => {
            if (!item.disabled) {
              handleSelect(item.key, ev);
            }
          }}
          onMouseenter={() => {
            if (!item.disabled) {
              setActiveKey(item.key);
            }
          }}
          onMouseleave={() => {
            if (!item.disabled) {
              setActiveKey();
            }
          }}
        >
          <span class={`${optionPrefixCls}-content`}>{getOptionContentFunc(item)()}</span>
        </li>
      );
    };

    const renderDropdown = () => {
      return (
        <SelectDropdown ref={dropdownRef}>
          {validOptions.value.map((info) => renderOption(info as SelectOptionInfo))}
        </SelectDropdown>
      );
    };

    const mirrorRef = ref<HTMLElement>();

    watch(computedPopupVisible, (visible) => {
      if (props.type === 'textarea' && visible) {
        nextTick(() => {
          if (
            // @ts-ignore
            inputRef.value?.textareaRef &&
            // @ts-ignore
            inputRef.value.textareaRef.scrollTop > 0
          ) {
            // @ts-ignore
            mirrorRef.value?.scrollTo(0, inputRef.value.textareaRef.scrollTop);
          }
        });
      }
    });

    const onFocus = (ev: FocusEvent) => {
      emit('focus', ev);
    };
    const onBlur = (ev: FocusEvent) => {
      emit('blur', ev);
    };

    const render = () => {
      if (props.type === 'textarea') {
        return (
          <div class={prefixCls}>
            <ResizeObserver onResize={handleResize}>
              <SDTextarea
                {...attrs}
                ref={inputRef}
                allowClear={mergedAllowClear.value}
                modelValue={computedValue.value}
                disabled={mergedDisabled.value}
                onInput={handleInput}
                onClear={handleClear}
                onFocus={onFocus}
                onBlur={onBlur}
                // @ts-ignore
                onKeydown={handleKeyDown}
              />
            </ResizeObserver>
            {measureInfo.value.measuring && validOptionInfos.value.length > 0 && (
              <div ref={mirrorRef} style={mirrorStyle.value} class={`${prefixCls}-measure`}>
                {computedValue.value?.slice(0, measureInfo.value.location)}
                <Trigger
                  v-slots={{ content: renderDropdown }}
                  trigger="focus"
                  position="bl"
                  popupOffset={4}
                  preventFocus={true}
                  popupVisible={computedPopupVisible.value}
                  clickToClose={false}
                  onPopupVisibleChange={handlePopupVisibleChange}
                >
                  <span>@</span>
                </Trigger>
              </div>
            )}
          </div>
        );
      }

      return (
        <Trigger
          v-slots={{ content: renderDropdown }}
          trigger="focus"
          position="bl"
          animationName="slide-dynamic-origin"
          popupOffset={4}
          preventFocus={true}
          popupVisible={computedPopupVisible.value}
          clickToClose={false}
          autoFitPopupWidth
          autoFitTransformOrigin
          disabled={mergedDisabled.value}
          onPopupVisibleChange={handlePopupVisibleChange}
        >
          <SDInput
            v-slots={slots}
            {...attrs}
            ref={inputRef}
            allowClear={mergedAllowClear.value}
            modelValue={computedValue.value}
            disabled={mergedDisabled.value}
            onInput={handleInput}
            onClear={handleClear}
            onFocus={onFocus}
            onBlur={onBlur}
            // @ts-ignore
            onKeydown={handleKeyDown}
          />
        </Trigger>
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
     * @version 2.24.0
     */
    focus() {
      (this.inputRef as HTMLInputElement)?.focus();
    },
    /**
     * @zh 使输入框失去焦点
     * @en Make the input box lose focus
     * @public
     * @version 2.24.0
     */
    blur() {
      (this.inputRef as HTMLInputElement)?.blur();
    },
  },
  render() {
    return this.render();
  },
});
