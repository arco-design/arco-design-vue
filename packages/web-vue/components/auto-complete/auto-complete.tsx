import {
  computed,
  defineComponent,
  ref,
  PropType,
  toRefs,
  ComponentPublicInstance,
  toRef,
  watch,
} from 'vue';
import ArcoInput from '../input';
import Trigger, { TriggerProps } from '../trigger';
import { getPrefixCls } from '../_utils/global-config';
import {
  SelectOptionInfo,
  FilterOption,
  SelectOptionData,
  SelectOptionGroup,
} from '../select/interface';
import { isFunction, isNull, isUndefined } from '../_utils/is';
import SelectDropdown from '../select/select-dropdown.vue';
import Option from '../select/option.vue';
import { useSelect } from '../select/hooks/use-select';
import { getKeyFromValue } from '../select/utils';
import { useFormItem } from '../_hooks/use-form-item';
import VirtualList from '../_components/virtual-list-v2';
import { VirtualListProps } from '../_components/virtual-list-v2/interface';

export default defineComponent({
  name: 'AutoComplete',
  inheritAttrs: false,
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: {
      type: String,
      default: undefined,
    },
    /**
     * @zh 默认值（非受控模式）
     * @en Default value (uncontrolled mode)
     */
    defaultValue: {
      type: String,
      default: '',
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
     * @zh 用于自动提示的数据
     * @en Data used for auto-complete
     */
    data: {
      type: Array as PropType<
        (string | number | SelectOptionData | SelectOptionGroup)[]
      >,
      default: () => [],
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for popup
     */
    popupContainer: {
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
    },
    /**
     * @zh 是否为严格校验模式
     * @en Whether it is strict verification mode
     */
    strict: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 自定义选项过滤方法
     * @en Custom option filtering method
     */
    filterOption: {
      type: [Boolean, Function] as PropType<FilterOption>,
      default: true,
    },
    /**
     * @zh trigger 组件属性
     * @en trigger props
     * @version 2.14.0
     */
    triggerProps: {
      type: Object as PropType<TriggerProps>,
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
    /**
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
     * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)
     * @type VirtualListProps
     * @version 2.50.0
     */
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
  },
  emits: {
    'update:modelValue': (value: string) => true,
    /**
     * @zh 绑定值发生改变时触发
     * @en Emitted when the value changes
     * @property {string} value
     */
    'change': (value: string) => true,
    /**
     * @zh 用户搜索时触发
     * @en Emitted when the user searches
     * @property {string} value
     */
    'search': (value: string) => true,
    /**
     * @zh 选择选项时触发
     * @en Emitted when an option is selected
     * @property {string} value
     */
    'select': (value: string) => true,
    /**
     * @zh 用户点击清除按钮时触发
     * @en Triggered when the user clicks the clear button
     * @param {Event} ev
     * @version 2.23.0
     */
    'clear': (ev: Event) => true,
    /**
     * @zh 下拉菜单发生滚动时触发
     * @en Triggered when the drop-down scrolls
     * @param {Event} ev
     * @version 2.52.0
     */
    'dropdownScroll': (ev: Event) => true,
    /**
     * @zh 下拉菜单滚动到底部时触发
     * @en Triggered when the drop-down menu is scrolled to the bottom
     * @param {Event} ev
     * @version 2.52.0
     */
    'dropdownReachBottom': (ev: Event) => true,
  },
  /**
   * @zh 弹出框的页脚
   * @en The footer of the popup menu box
   * @slot footer
   */
  /**
   * @zh 选项内容
   * @en Display content of options
   * @slot option
   * @binding {OptionInfo} data
   * @version 2.13.0
   */
  setup(props, { emit, attrs, slots }) {
    const { modelValue } = toRefs(props);
    const prefixCls = getPrefixCls('auto-complete');
    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled: toRef(props, 'disabled'),
    });

    const _value = ref(props.defaultValue);
    const inputRef = ref<HTMLInputElement>();
    const computedValue = computed(() => props.modelValue ?? _value.value);

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = '';
      }
    });

    const computedValueKeys = computed(() =>
      computedValue.value ? [getKeyFromValue(computedValue.value)] : []
    );
    const { data } = toRefs(props);
    const dropdownRef = ref();
    const optionRefs = ref<Record<string, HTMLElement>>({});

    const _popupVisible = ref(false);
    const computedPopupVisible = computed(
      () => _popupVisible.value && validOptionInfos.value.length > 0
    );

    // VirtualList
    const virtualListRef = ref();
    const component = computed(() => (props.virtualListProps ? 'div' : 'li'));

    const handlePopupVisibleChange = (popupVisible: boolean) => {
      _popupVisible.value = popupVisible;
    };

    const strictFilterOption = (
      inputValue: string,
      option: SelectOptionData
    ) => {
      return Boolean(option.label?.includes(inputValue));
    };

    const mergedFilterOption = computed(() => {
      if (isFunction(props.filterOption)) {
        return props.filterOption;
      }
      if (props.filterOption && props.strict) {
        return strictFilterOption;
      }
      return props.filterOption;
    });

    const handleChange = (value: string) => {
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

    // Dropdown事件
    const handleSelect = (key: string, ev: Event) => {
      const value = optionInfoMap.get(key)?.value as string;
      emit('select', value);
      handleChange(value);
      inputRef.value?.blur();
    };

    // Input事件
    const handleInputValueChange = (value: string) => {
      emit('search', value);
      handleChange(value);
    };

    const handleDropdownScroll = (e: Event) => {
      emit('dropdownScroll', e);
    };

    const handleDropdownReachBottom = (e: Event) => {
      emit('dropdownReachBottom', e);
    };

    const { validOptions, optionInfoMap, validOptionInfos, handleKeyDown } =
      useSelect({
        options: data,
        inputValue: computedValue,
        filterOption: mergedFilterOption,
        popupVisible: computedPopupVisible,
        valueKeys: computedValueKeys,
        component,
        dropdownRef,
        optionRefs,
        onSelect: handleSelect,
        onPopupVisibleChange: handlePopupVisibleChange,
      });

    const getOptionContentFunc = (item: SelectOptionInfo) => {
      if (isFunction(slots.option) && item.value) {
        const optionInfo = optionInfoMap.get(item.key);
        const optionSlot = slots.option;
        return () => optionSlot({ data: optionInfo });
      }
      return () => item.label;
    };

    const renderOption = (item: SelectOptionInfo) => {
      return (
        <Option
          // @ts-ignore
          ref={(ref: ComponentPublicInstance) => {
            if (ref?.$el) {
              optionRefs.value[item.key] = ref.$el;
            }
          }}
          v-slots={{
            default: getOptionContentFunc(item),
          }}
          key={item.key}
          value={item.value}
          disabled={item.disabled}
          internal
        />
      );
    };

    const renderDropdown = () => {
      return (
        <SelectDropdown
          ref={dropdownRef}
          class={`${prefixCls}-dropdown`}
          v-slots={{
            'default': () => [
              ...validOptions.value.map((info) =>
                renderOption(info as SelectOptionInfo)
              ),
            ],
            'virtual-list': () => (
              <VirtualList
                {...props.virtualListProps}
                ref={virtualListRef}
                data={validOptions.value}
                v-slots={{
                  item: ({ item }: { item: SelectOptionInfo }) =>
                    renderOption(item),
                }}
              />
            ),
            'footer': slots.footer,
          }}
          virtualList={Boolean(props.virtualListProps)}
          onScroll={handleDropdownScroll}
          onReachBottom={handleDropdownReachBottom}
        />
      );
    };

    const render = () => (
      <Trigger
        v-slots={{ content: renderDropdown }}
        trigger="focus"
        position="bl"
        animationName="slide-dynamic-origin"
        autoFitTransformOrigin
        popupVisible={computedPopupVisible.value}
        clickToClose={false}
        preventFocus={true}
        popupOffset={4}
        disabled={mergedDisabled.value}
        autoFitPopupWidth
        {...props.triggerProps}
        onPopupVisibleChange={handlePopupVisibleChange}
      >
        <ArcoInput
          v-slots={slots}
          ref={inputRef}
          {...attrs}
          allowClear={props.allowClear}
          modelValue={computedValue.value}
          disabled={mergedDisabled.value}
          onInput={handleInputValueChange}
          onClear={handleClear}
          // @ts-ignore
          onKeydown={handleKeyDown}
        />
      </Trigger>
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
     * @version 2.40.0
     */
    focus() {
      (this.inputRef as HTMLInputElement)?.focus();
    },
    /**
     * @zh 使输入框失去焦点
     * @en Make the input box lose focus
     * @public
     * @version 2.40.0
     */
    blur() {
      (this.inputRef as HTMLInputElement)?.blur();
    },
  },
  render() {
    return this.render();
  },
});
