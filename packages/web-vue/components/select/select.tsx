import type { ComponentPublicInstance, PropType } from 'vue';
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  toRefs,
  watch,
  watchEffect,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import {
  isArray,
  isEmptyObject,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from '../_utils/is';
import {
  getKeyFromValue,
  isGroupOptionInfo,
  isValidOption,
  hasEmptyStringKey,
} from './utils';
import Trigger, { TriggerProps } from '../trigger';
import SelectView from '../_components/select-view/select-view';
import { Size } from '../_utils/constant';
import { Data } from '../_utils/types';
import SelectDropdown from './select-dropdown.vue';
import Option from './option.vue';
import OptGroup from './optgroup.vue';
import {
  OptionValueWithKey,
  SelectFieldNames,
  SelectOptionData,
  SelectOptionGroup,
  SelectOptionGroupInfo,
  SelectOptionInfo,
} from './interface';
import VirtualList from '../_components/virtual-list-v2';
import { VirtualListProps } from '../_components/virtual-list-v2/interface';
import { useSelect } from './hooks/use-select';
import { TagData } from '../input-tag';
import { useTrigger } from '../_hooks/use-trigger';
import { useFormItem } from '../_hooks/use-form-item';
import { debounce } from '../_utils/debounce';
import { SelectViewValue } from '../_components/select-view/interface';
import { ScrollbarProps } from '../scrollbar';

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  disabled: 'disabled',
  tagProps: 'tagProps',
  render: 'render',
};

export default defineComponent({
  name: 'Select',
  components: {
    Trigger,
    SelectView,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 是否开启多选模式（多选模式默认开启搜索）
     * @en Whether to open multi-select mode (The search is turned on by default in the multi-select mode)
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: {
      type: [String, Number, Object, Array] as PropType<
        | string
        | number
        | Record<string, any>
        | (string | number | Record<string, any>)[]
      >,
    },
    /**
     * @zh 默认值（非受控模式）
     * @en Default value (uncontrolled mode)
     * @defaultValue '' \| []
     */
    defaultValue: {
      type: [String, Number, Object, Array] as PropType<
        | string
        | number
        | Record<string, unknown>
        | (string | number | Record<string, unknown>)[]
      >,
      default: (props: Data) => (isUndefined(props.multiple) ? '' : []),
    },
    /**
     * @zh 输入框的值
     * @en The value of the input
     * @vModel
     */
    inputValue: {
      type: String,
    },
    /**
     * @zh 输入框的默认值（非受控模式）
     * @en The default value of the input (uncontrolled mode)
     */
    defaultInputValue: {
      type: String,
      default: '',
    },
    /**
     * @zh 选择框的大小
     * @en The size of the select
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 占位符
     * @en Placeholder
     */
    placeholder: String,
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     */
    loading: {
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
     * @zh 是否为错误状态
     * @en Whether it is an error state
     */
    error: {
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
     * @zh 是否允许搜索
     * @en Whether to allow searching
     * @defaultValue false (single) \| true (multiple)
     */
    allowSearch: {
      type: [Boolean, Object] as PropType<
        boolean | { retainInputValue?: boolean }
      >,
      default: (props: Data) => Boolean(props.multiple),
    },
    /**
     * @zh 是否允许创建
     * @en Whether to allow creation
     */
    allowCreate: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 多选模式下，最多显示的标签数量。0 表示不限制
     * @en In multi-select mode, the maximum number of labels displayed. 0 means unlimited
     */
    maxTagCount: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for popup
     */
    popupContainer: {
      type: [String, Object] as PropType<string | HTMLElement>,
    },
    /**
     * @zh 是否显示输入框的边框
     * @en Whether to display the border of the input box
     */
    bordered: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否在无值时默认选择第一个选项
     * @en Whether to select the first option by default when there is no value
     * @version 2.43.0
     */
    defaultActiveFirstOption: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否显示下拉菜单
     * @en Whether to show the dropdown
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 弹出框默认是否可见（非受控模式）
     * @en Whether the popup is visible by default (uncontrolled mode)
     */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在下拉菜单关闭时销毁元素
     * @en Whether to destroy the element when the dropdown is closed
     */
    unmountOnClose: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否过滤选项
     * @en Whether to filter options
     */
    filterOption: {
      type: [Boolean, Function] as PropType<
        boolean | ((inputValue: string, option: SelectOptionData) => boolean)
      >,
      default: true,
    },
    /**
     * @zh 选项数据
     * @en Option data
     */
    options: {
      type: Array as PropType<
        (string | number | SelectOptionData | SelectOptionGroup)[]
      >,
      default: () => [],
    },
    /**
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
     * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)
     * @type VirtualListProps
     */
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
    /**
     * @zh 下拉菜单的触发器属性
     * @en Trigger props of the drop-down menu
     * @type TriggerProps
     */
    triggerProps: {
      type: Object as PropType<TriggerProps>,
    },
    /**
     * @zh 格式化显示内容
     * @en Format display content
     */
    formatLabel: {
      type: Function as PropType<(data: SelectOptionData) => string>,
    },
    /**
     * @zh 自定义值中不存在的选项
     * @en Options that do not exist in custom values
     * @version 2.10.0
     */
    fallbackOption: {
      type: [Boolean, Function] as PropType<
        | boolean
        | ((
            value: string | number | Record<string, unknown>
          ) => SelectOptionData)
      >,
      default: true,
    },
    /**
     * @zh 是否在下拉菜单中显示额外选项
     * @en Options that do not exist in custom values
     * @version 2.10.0
     */
    showExtraOptions: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 用于确定选项键值的属性名
     * @en Used to determine the option key value attribute name
     * @version 2.18.0
     */
    valueKey: {
      type: String,
      default: 'value',
    },
    /**
     * @zh 触发搜索事件的延迟时间
     * @en Delay time to trigger search event
     * @version 2.18.0
     */
    searchDelay: {
      type: Number,
      default: 500,
    },
    /**
     * @zh 多选时最多的选择个数
     * @en Maximum number of choices in multiple choice
     * @version 2.18.0
     */
    limit: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 自定义 `SelectOptionData` 中的字段
     * @en Customize fields in `SelectOptionData`
     * @version 2.22.0
     */
    fieldNames: {
      type: Object as PropType<SelectFieldNames>,
    },
    /**
     * @zh 是否开启虚拟滚动条
     * @en Whether to enable virtual scroll bar
     * @version 2.38.0
     */
    scrollbar: {
      type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
      default: true,
    },
    /**
     * @zh 空状态时是否显示header
     * @en Whether to display the header in the empty state
     */
    showHeaderOnEmpty: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * @zh 空状态时是否显示footer
     * @en Whether to display the footer in the empty state
     */
    showFooterOnEmpty: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (
      value:
        | string
        | number
        | Record<string, any>
        | (string | number | Record<string, any>)[]
    ) => true,
    'update:inputValue': (inputValue: string) => true,
    'update:popupVisible': (visible: boolean) => true,
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @param { string | number | Record<string, any> | (string | number | Record<string, any>)[] } value
     */
    'change': (
      value:
        | string
        | number
        | Record<string, any>
        | (string | number | Record<string, any>)[]
    ) => true,
    /**
     * @zh 输入框的值发生改变时触发
     * @en Triggered when the value of the input changes
     * @param {string} inputValue
     */
    'inputValueChange': (inputValue: string) => true,
    /**
     * @zh 下拉框的显示状态改变时触发
     * @en Triggered when the display state of the drop-down box changes
     * @param {boolean} visible
     */
    'popupVisibleChange': (visible: boolean) => true,
    /**
     * @zh 点击清除按钮时触发
     * @en Triggered when the clear button is clicked
     */
    'clear': (ev: Event) => true,
    /**
     * @zh 点击标签的删除按钮时触发
     * @en Triggered when the delete button of the label is clicked
     * @param {string | number | Record<string, any> | undefined} removed
     */
    'remove': (removed: string | number | Record<string, any> | undefined) =>
      true,
    /**
     * @zh 用户搜索时触发
     * @en Triggered when the user searches
     * @param {string} inputValue
     */
    'search': (inputValue: string) => true,
    /**
     * @zh 下拉菜单发生滚动时触发
     * @en Triggered when the drop-down scrolls
     */
    'dropdownScroll': (ev: Event) => true,
    /**
     * @zh 下拉菜单滚动到底部时触发
     * @en Triggered when the drop-down menu is scrolled to the bottom
     */
    'dropdownReachBottom': (ev: Event) => true,
    /**
     * @zh 多选超出限制时触发
     * @en Triggered when multiple selection exceeds the limit
     * @param {string | number | Record<string, any> | undefined} value
     * @param {Event} ev
     * @version 2.18.0
     */
    'exceedLimit': (
      value: string | number | Record<string, any> | undefined,
      ev: Event
    ) => true,
  },
  /**
   * @zh 选项为空时的显示内容
   * @en Display content when the option is empty
   * @slot empty
   */
  /**
   * @zh 选项内容
   * @en Display content of options
   * @slot option
   * @binding {SelectOptionData} data
   */
  /**
   * @zh 选择框的显示内容
   * @en Display content of label
   * @slot label
   * @binding {SelectOptionData} data
   */
  /**
   * @zh 下拉框的页头
   * @en The header of the drop-down box
   * @slot header
   * @version 2.43.0
   */
  /**
   * @zh 下拉框的页脚
   * @en The footer of the drop-down box
   * @slot footer
   */
  /**
   * @zh 选择框的箭头图标
   * @en Arrow icon for select box
   * @slot arrow-icon
   * @version 2.16.0
   */
  /**
   * @zh 选择框的加载中图标
   * @en Loading icon for select box
   * @slot loading-icon
   * @version 2.16.0
   */
  /**
   * @zh 选择框的搜索图标
   * @en Search icon for select box
   * @slot search-icon
   * @version 2.16.0
   */
  /**
   * @zh 前缀元素
   * @en Prefix
   * @slot prefix
   * @version 2.22.0
   */
  /**
   * @zh 自定义触发元素
   * @en Custom trigger element
   * @slot trigger
   * @version 2.22.0
   */
  setup(props, { slots, emit, attrs }) {
    // props
    const {
      size,
      disabled,
      error,
      options,
      filterOption,
      valueKey,
      multiple,
      popupVisible,
      showExtraOptions,
      modelValue,
      fieldNames,
      loading,
      defaultActiveFirstOption,
    } = toRefs(props);
    const prefixCls = getPrefixCls('select');
    const { mergedSize, mergedDisabled, mergedError, eventHandlers } =
      useFormItem({
        size,
        disabled,
        error,
      });
    const component = computed(() => (props.virtualListProps ? 'div' : 'li'));
    const retainInputValue = computed(
      () =>
        isObject(props.allowSearch) &&
        Boolean(props.allowSearch.retainInputValue)
    );
    const formatLabel = computed(() => {
      if (isFunction(props.formatLabel)) {
        return (data: TagData) => {
          const optionInfo = optionInfoMap.get(data.value as string);
          // @ts-ignore
          return props.formatLabel(optionInfo);
        };
      }
      return undefined;
    });

    // refs
    const dropdownRef = ref<ComponentPublicInstance>();
    const optionRefs = ref<Record<string, HTMLElement>>({});
    const virtualListRef = ref();

    // trigger
    const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
      popupVisible,
      emit,
    });

    // value and key
    const _value = ref(props.defaultValue);
    const computedValueObjects = computed<OptionValueWithKey[]>(() => {
      const mergedValue = props.modelValue ?? _value.value;
      const valueArray = isArray(mergedValue)
        ? mergedValue
        : mergedValue || isNumber(mergedValue) || isString(mergedValue)
        ? [mergedValue]
        : [];
      return valueArray.map((value) => ({
        value,
        key: getKeyFromValue(value, props.valueKey),
      }));
    });
    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = multiple.value ? [] : (value as any);
      }
    });

    const computedValueKeys = computed(() =>
      computedValueObjects.value.map((obj) => obj.key)
    );

    const mergedFieldNames = computed(() => ({
      ...DEFAULT_FIELD_NAMES,
      ...fieldNames?.value,
    }));

    // selected option
    const _selectedOption = ref();
    const getRawOptionFromValueKeys = (valueKeys: string[]) => {
      const optionMap: Record<string, unknown> = {};

      valueKeys.forEach((key) => {
        optionMap[key] = optionInfoMap.get(key);
      });

      return optionMap;
    };

    const updateSelectedOption = (valueKeys: string[]) => {
      _selectedOption.value = getRawOptionFromValueKeys(valueKeys);
    };

    // extra value and option
    const getFallBackOption = (
      value: string | number | Record<string, unknown>
    ): SelectOptionData => {
      if (isFunction(props.fallbackOption)) {
        return props.fallbackOption(value);
      }
      return {
        [mergedFieldNames.value.value]: value,
        [mergedFieldNames.value.label]: String(
          isObject(value) ? value[valueKey?.value] : value
        ),
      };
    };

    const getExtraValueData = (): OptionValueWithKey[] => {
      const valueArray: OptionValueWithKey[] = [];
      const keyArray: string[] = [];

      if (props.allowCreate || props.fallbackOption) {
        for (const item of computedValueObjects.value) {
          if (!keyArray.includes(item.key) && item.value !== '') {
            const optionInfo = optionInfoMap.get(item.key);
            if (!optionInfo || optionInfo.origin === 'extraOptions') {
              valueArray.push(item);
              keyArray.push(item.key);
            }
          }
        }
      }

      if (props.allowCreate && computedInputValue.value) {
        const key = getKeyFromValue(computedInputValue.value);
        if (!keyArray.includes(key)) {
          const optionInfo = optionInfoMap.get(key);
          if (!optionInfo || optionInfo.origin === 'extraOptions') {
            valueArray.push({
              value: computedInputValue.value,
              key,
            });
          }
        }
      }
      return valueArray;
    };

    const extraValueObjects = ref<OptionValueWithKey[]>([]);
    const extraOptions = computed(() =>
      extraValueObjects.value.map((obj) => {
        let optionInfo = getFallBackOption(obj.value);
        const extraOptionRawInfo = _selectedOption.value?.[obj.key];
        if (
          !isUndefined(extraOptionRawInfo) &&
          !isEmptyObject(extraOptionRawInfo)
        ) {
          optionInfo = { ...optionInfo, ...extraOptionRawInfo };
        }
        return optionInfo;
      })
    );

    nextTick(() => {
      watchEffect(() => {
        const valueData = getExtraValueData();
        if (valueData.length !== extraValueObjects.value.length) {
          extraValueObjects.value = valueData;
        } else if (valueData.length > 0) {
          for (let i = 0; i < valueData.length; i++) {
            if (valueData[i].key !== extraValueObjects.value[i]?.key) {
              extraValueObjects.value = valueData;
              break;
            }
          }
        }
      });
    });

    // input value
    const _inputValue = ref('');
    const computedInputValue = computed(
      () => props.inputValue ?? _inputValue.value
    );

    // clear input value when close dropdown
    watch(computedPopupVisible, (visible) => {
      if (!visible && !retainInputValue.value && computedInputValue.value) {
        updateInputValue('');
      }
    });

    // update func
    const getValueFromValueKeys = (valueKeys: string[]) => {
      if (!props.multiple) {
        return (
          optionInfoMap.get(valueKeys[0])?.value ??
          (hasEmptyStringKey(optionInfoMap)
            ? (undefined as unknown as string)
            : '')
        );
      }
      return valueKeys.map((key) => optionInfoMap.get(key)?.value ?? '');
    };

    const updateValue = (valueKeys: string[]) => {
      const value = getValueFromValueKeys(valueKeys);
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value);
      eventHandlers.value?.onChange?.();
      updateSelectedOption(valueKeys);
    };

    const updateInputValue = (inputValue: string) => {
      _inputValue.value = inputValue;
      emit('update:inputValue', inputValue);
      emit('inputValueChange', inputValue);
    };

    // events
    const handleSelect = (key: string, ev: Event) => {
      if (props.multiple) {
        if (!computedValueKeys.value.includes(key)) {
          if (enabledOptionKeys.value.includes(key)) {
            if (
              props.limit > 0 &&
              computedValueKeys.value.length >= props.limit
            ) {
              const info = optionInfoMap.get(key);
              emit('exceedLimit', info?.value, ev);
            } else {
              const valueKeys = computedValueKeys.value.concat(key);
              updateValue(valueKeys);
            }
          }
        } else {
          const valueKeys = computedValueKeys.value.filter(
            (_key) => _key !== key
          );
          updateValue(valueKeys);
        }
        if (!retainInputValue.value) {
          // 点击一个选项时，清空输入框内容
          updateInputValue('');
        }
      } else {
        if (key !== computedValueKeys.value[0]) {
          updateValue([key]);
        }
        if (retainInputValue.value) {
          const optionInfo = optionInfoMap.get(key);
          if (optionInfo) {
            updateInputValue(optionInfo.label);
          }
        }

        handlePopupVisibleChange(false);
      }
    };

    const handleSearch = debounce((value: string) => {
      emit('search', value);
    }, props.searchDelay);

    const handleInputValueChange = (inputValue: string) => {
      if (inputValue !== computedInputValue.value) {
        if (!computedPopupVisible.value) {
          handlePopupVisibleChange(true);
        }

        updateInputValue(inputValue);

        if (props.allowSearch) {
          handleSearch(inputValue);
        }
      }
    };

    const handleRemove = (key: string) => {
      const optionInfo = optionInfoMap.get(key);
      const newKeys = computedValueKeys.value.filter((_key) => _key !== key);
      updateValue(newKeys);
      emit('remove', optionInfo?.value);
    };

    const handleClear = (e: Event) => {
      e?.stopPropagation();
      const newKeys = computedValueKeys.value.filter(
        (key) => optionInfoMap.get(key)?.disabled
      );
      updateValue(newKeys);
      updateInputValue('');
      emit('clear', e);
    };

    const handleDropdownScroll = (e: Event) => {
      emit('dropdownScroll', e);
    };

    const handleDropdownReachBottom = (e: Event) => {
      emit('dropdownReachBottom', e);
    };

    const {
      validOptions,
      optionInfoMap,
      validOptionInfos,
      enabledOptionKeys,
      handleKeyDown,
    } = useSelect({
      multiple,
      options,
      extraOptions,
      inputValue: computedInputValue,
      filterOption,
      showExtraOptions,
      component,
      valueKey,
      fieldNames,
      loading,
      popupVisible: computedPopupVisible,
      valueKeys: computedValueKeys,
      dropdownRef,
      optionRefs,
      virtualListRef,
      defaultActiveFirstOption,
      onSelect: handleSelect,
      onPopupVisibleChange: handlePopupVisibleChange,
    });

    const selectViewValue = computed(() => {
      const result: SelectViewValue[] = [];
      for (const item of computedValueObjects.value) {
        const optionInfo = optionInfoMap.get(item.key);
        if (optionInfo) {
          result.push({
            ...optionInfo,
            value: item.key,
            label:
              optionInfo?.label ??
              String(
                isObject(item.value) ? item.value[valueKey?.value] : item.value
              ),
            closable: !optionInfo?.disabled,
            tagProps: optionInfo?.tagProps,
          });
        }
      }
      return result;
    });

    const getOptionContentFunc = (optionInfo: SelectOptionInfo) => {
      if (isFunction(slots.option)) {
        const optionSlot = slots.option;
        return () => optionSlot({ data: optionInfo.raw });
      }
      if (isFunction(optionInfo.render)) {
        return optionInfo.render;
      }
      return () => optionInfo.label;
    };

    const renderOption = (
      optionInfo: SelectOptionInfo | SelectOptionGroupInfo
    ) => {
      if (isGroupOptionInfo(optionInfo)) {
        return (
          <OptGroup key={optionInfo.key} label={optionInfo.label}>
            {optionInfo.options.map((child) => renderOption(child))}
          </OptGroup>
        );
      }

      if (
        !isValidOption(optionInfo, {
          inputValue: computedInputValue.value,
          filterOption: filterOption?.value,
        })
      ) {
        return null;
      }

      return (
        <Option
          v-slots={{
            default: getOptionContentFunc(optionInfo),
          }}
          // @ts-ignore
          ref={(ref: ComponentPublicInstance) => {
            if (ref?.$el) {
              optionRefs.value[optionInfo.key] = ref.$el;
            }
          }}
          key={optionInfo.key}
          value={optionInfo.value}
          label={optionInfo.label}
          disabled={optionInfo.disabled}
          internal
        />
      );
    };

    const renderDropDown = () => {
      return (
        <SelectDropdown
          ref={dropdownRef}
          v-slots={{
            'default': () => [
              ...(slots.default?.() ?? []),
              ...validOptions.value.map(renderOption),
            ],
            'virtual-list': () => (
              <VirtualList
                {...props.virtualListProps}
                ref={virtualListRef}
                data={validOptions.value}
                v-slots={{
                  item: ({
                    item,
                  }: {
                    item: SelectOptionInfo | SelectOptionGroupInfo;
                  }) => renderOption(item),
                }}
              />
            ),
            'empty': slots.empty,
            'header': slots.header,
            'footer': slots.footer,
          }}
          loading={props.loading}
          empty={validOptionInfos.value.length === 0}
          virtualList={Boolean(props.virtualListProps)}
          scrollbar={props.scrollbar}
          showHeaderOnEmpty={props.showHeaderOnEmpty}
          showFooterOnEmpty={props.showFooterOnEmpty}
          onScroll={handleDropdownScroll}
          onReachBottom={handleDropdownReachBottom}
        />
      );
    };

    const renderLabel = ({ data }: { data: SelectViewValue }) => {
      if ((slots.label || isFunction(props.formatLabel)) && data) {
        const optionInfo = optionInfoMap.get(data.value as string);
        if (optionInfo?.raw) {
          return (
            slots.label?.({ data: optionInfo.raw }) ??
            props.formatLabel?.(optionInfo.raw)
          );
        }
      }
      return data?.label ?? '';
    };

    return () => (
      <Trigger
        v-slots={{ content: renderDropDown }}
        trigger="click"
        position="bl"
        popupOffset={4}
        animationName="slide-dynamic-origin"
        hideEmpty
        preventFocus
        autoFitPopupWidth
        autoFitTransformOrigin
        disabled={mergedDisabled.value}
        popupVisible={computedPopupVisible.value}
        unmountOnClose={props.unmountOnClose}
        clickToClose={!(props.allowSearch || props.allowCreate)}
        popupContainer={props.popupContainer}
        onPopupVisibleChange={handlePopupVisibleChange}
        {...props.triggerProps}
      >
        {slots.trigger?.() ?? (
          <SelectView
            v-slots={{
              'label': renderLabel,
              'prefix': slots.prefix,
              'arrow-icon': slots['arrow-icon'],
              'loading-icon': slots['loading-icon'],
              'search-icon': slots['search-icon'],
            }}
            class={prefixCls}
            modelValue={selectViewValue.value}
            inputValue={computedInputValue.value}
            multiple={props.multiple}
            disabled={mergedDisabled.value}
            error={mergedError.value}
            loading={props.loading}
            allowClear={props.allowClear}
            allowCreate={props.allowCreate}
            allowSearch={Boolean(props.allowSearch)}
            opened={computedPopupVisible.value}
            maxTagCount={props.maxTagCount}
            placeholder={props.placeholder}
            bordered={props.bordered}
            size={mergedSize.value}
            // @ts-ignore
            onInputValueChange={handleInputValueChange}
            onRemove={handleRemove}
            onClear={handleClear}
            onKeydown={handleKeyDown}
            {...attrs}
          />
        )}
      </Trigger>
    );
  },
});
