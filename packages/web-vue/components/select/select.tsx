import type { ComponentPublicInstance, PropType } from 'vue';
import {
  computed,
  createVNode,
  defineComponent,
  nextTick,
  ref,
  toRefs,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { isArray, isFunction, isObject } from '../_utils/is';
import { getValueDataFromModelValue } from './utils';
import Trigger, { TriggerProps } from '../trigger';
import SelectView from '../_components/select-view/select-view';
import { Size } from '../_utils/constant';
import { Data } from '../_utils/types';
import { CODE, getKeyDownHandler } from '../_utils/keyboard';
import usePickSlots from '../_hooks/use-pick-slots';
import {
  Dropdown,
  DropDownOption,
  DropDownOptGroup,
} from '../_components/dropdown';
import { useOptions } from '../_hooks/use-options';
import {
  Option,
  OptionInfo,
  OptionNode,
} from '../_components/dropdown/interface';
import VirtualList from '../_components/virtual-list/virtual-list.vue';
import { VirtualListProps } from '../_components/virtual-list/interface';

// Reasons for the change of input box value: user input, selected option, option drop-down box collapsed, trigger automatic word segmentation
export type InputValueChangeReason =
  | 'manual'
  | 'optionChecked'
  | 'optionListHide'
  | 'tokenSeparator';

export default defineComponent({
  name: 'Select',
  inheritAttrs: false,
  props: {
    /**
     * @zh 是否开启多选模式
     * @en Whether to open multi-select mode
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
      type: [String, Number, Array] as PropType<
        string | number | Array<string | number>
      >,
    },
    /**
     * @zh 默认值（非受控模式）
     * @en Default value (uncontrolled mode)
     * @defaultValue '' | []
     */
    defaultValue: {
      type: [String, Number, Array] as PropType<
        string | number | Array<string | number>
      >,
      // default的props只包括之前的
      default: (props: Data) => (props.multiple ? [] : ''),
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
     * @values 'mini', 'small', 'medium', 'large'
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
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
     */
    allowSearch: {
      type: Boolean,
      default: (props: Data) => props.multiple,
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
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
    },
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
     * @zh 是否在下拉菜单关闭时销毁元素
     * @en Whether to destroy the element when the dropdown is closed
     */
    unmountOnClose: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否过滤选项
     * @en Whether to filter options
     */
    filterOption: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 选项数据
     * @en Option data
     */
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
    /**
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#virtuallistprops)
     * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#virtuallistprops)
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
      type: Function as PropType<(data: OptionInfo) => string>,
    },
    // for JSX
    onChange: {
      type: Function as PropType<
        (value: string | number | Array<string | number>) => void
      >,
    },
    onInputValueChange: {
      type: Function as PropType<(inputValue: string) => void>,
    },
    onPopupVisibleChange: {
      type: Function as PropType<(popupVisible: boolean) => void>,
    },
    onClear: {
      type: Function as PropType<() => void>,
    },
    onRemove: {
      type: Function as PropType<(removed: string) => void>,
    },
    onSearch: {
      type: Function as PropType<(inputValue: string) => void>,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     */
    'change',
    /**
     * @zh 输入框的值发生改变时触发
     * @en Triggered when the value of the input changes
     */
    'inputValueChange',
    /**
     * @zh 下拉框的显示状态改变时触发
     * @en Triggered when the display state of the drop-down box changes
     */
    'popupVisibleChange',
    /**
     * @zh 点击清除按钮时触发
     * @en Triggered when the clear button is clicked
     */
    'clear',
    /**
     * @zh 点击标签的删除按钮时触发
     * @en Triggered when the delete button of the label is clicked
     */
    'remove',
    /**
     * @zh 用户搜索时触发
     * @en Triggered when the user searches
     */
    'search',
    /**
     * @zh 下拉菜单发生滚动时触发
     * @en Triggered when the drop-down scrolls
     */
    'dropdownScroll',
    /**
     * @zh 下拉菜单滚动到底部时触发
     * @en Triggered when the drop-down menu is scrolled to the bottom
     */
    'dropdownReachBottom',
  ],
  /**
   * @zh 选项为空时的显示内容
   * @en Display content when the option is empty
   * @slot empty
   */
  /**
   * @zh 选项内容
   * @en Display content of options
   * @slot option
   * @binding {OptionInfo} data
   */
  /**
   * @zh 选择框的显示内容
   * @en Display content of label
   * @slot label
   * @binding {OptionInfo} data
   */
  /**
   * @zh 下拉框的页脚
   * @en The footer of the drop-down box
   * @slot footer
   */
  setup(props, { slots, emit, attrs }) {
    const prefixCls = getPrefixCls('select');
    const { options, filterOption } = toRefs(props);
    const defaultSlot = usePickSlots(slots, 'default');
    const dropdownRef = ref();
    const optionRefs = ref<Record<string, HTMLElement>>({});
    const _value = ref(props.defaultValue);
    const _inputValue = ref('');
    const _popupVisible = ref(false);

    const computedValue = computed(() => {
      const mergedValue = props.modelValue ?? _value.value;
      if (props.multiple) {
        if (!isArray(mergedValue)) {
          return mergedValue ? [mergedValue] : [];
        }
      } else if (isArray(mergedValue)) {
        return mergedValue[0] ?? '';
      }

      return mergedValue;
    });
    const computedInputValue = computed(
      () => props.inputValue ?? _inputValue.value
    );
    const computedPopupVisible = computed(
      () => props.popupVisible ?? _popupVisible.value
    );
    const retainInputValue = computed(
      () =>
        isObject(props.allowSearch) &&
        Boolean(props.allowSearch.retainInputValue)
    );

    // User-created options
    const createdOptions = computed(() => {
      const options: Array<string | number> = [];
      if (props.allowCreate) {
        if (isArray(computedValue.value)) {
          options.push(...computedValue.value);
        } else if (computedValue.value) {
          options.push(computedValue.value);
        }
        if (
          computedInputValue.value &&
          !options.includes(computedInputValue.value)
        ) {
          options.push(computedInputValue.value);
        }
      }
      return options;
    });

    const virtualListRef = ref();

    const {
      optionNodes,
      optionInfoMap,
      enabledOptionSet,
      activeOption,
      getNextActiveOption,
      scrollIntoView,
    } = useOptions({
      defaultSlot,
      options,
      extraOptions: createdOptions,
      inputValue: computedInputValue,
      filterOption,
      dropdownRef,
      optionRefs,
      virtualListRef,
    });

    const updateValue = (value: string | number | Array<string | number>) => {
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value);
    };

    // Trigger事件
    const handlePopupVisibleChange = (visible: boolean): void => {
      if (computedPopupVisible.value !== visible) {
        _popupVisible.value = visible;
        emit('popupVisibleChange', visible);
      }
    };

    // When multiple selections, select an option
    const checkOption = (value: string | number) => {
      if (isArray(computedValue.value) && enabledOptionSet.has(value)) {
        const newValue = computedValue.value.concat(value);
        updateValue(newValue);
      }
    };

    // When multiple selections, cancel an option
    const uncheckOption = (value: string | number) => {
      if (isArray(computedValue.value)) {
        const newValue = computedValue.value.filter((v) => v !== value);
        updateValue(newValue);
      }
    };

    // Dropdown Events
    const handleSelect = (value: string | number, e: Event) => {
      if (props.multiple) {
        if (isArray(computedValue.value)) {
          if (computedValue.value.includes(value)) {
            uncheckOption(value);
          } else {
            checkOption(value);
          }
        }
        if (!retainInputValue.value) {
          // 点击一个选项时，清空输入框内容
          handleInputValueChange('', 'optionChecked');
        }
      } else {
        if (value !== computedValue.value) {
          updateValue(value);
        }
        handlePopupVisibleChange(false);
      }
    };

    const handleMouseEnter = (value: string | number, e: Event) => {
      const optionInfo = optionInfoMap.get(value);
      if (optionInfo) {
        activeOption.value = optionInfo;
      }
    };

    const handleMouseLeave = (e: Event) => {
      activeOption.value = undefined;
    };

    const handleDropdownScroll = (e: Event) => {
      emit('dropdownScroll', e);
    };

    const handleDropdownReachBottom = (e: Event) => {
      emit('dropdownReachBottom', e);
    };

    // SelectView事件
    const handleInputValueChange = (
      value: string,
      reason: InputValueChangeReason
    ): void => {
      if (value !== computedInputValue.value) {
        if (reason === 'manual' && !computedPopupVisible.value) {
          _popupVisible.value = true;
          emit('popupVisibleChange', true);
        }

        _inputValue.value = value;
        emit('inputValueChange', value);

        if (props.allowSearch) {
          emit('search', value);
        }
      }
    };

    const handleKeyDown = getKeyDownHandler(
      new Map([
        [
          CODE.ENTER,
          (e: Event) => {
            if (computedPopupVisible.value) {
              if (activeOption.value) {
                handleSelect(activeOption.value.value, e);
              }
            } else {
              handlePopupVisibleChange(true);
            }
            e.preventDefault();
          },
        ],
        [
          CODE.ESC,
          (e: Event) => {
            handlePopupVisibleChange(false);
            e.preventDefault();
          },
        ],
        [
          CODE.ARROW_DOWN,
          (e: Event) => {
            const next = getNextActiveOption('down');
            if (next) {
              activeOption.value = next;
              scrollIntoView(next.value);
            }
            e.preventDefault();
          },
        ],
        [
          CODE.ARROW_UP,
          (e: Event) => {
            const next = getNextActiveOption('up');
            if (next) {
              activeOption.value = next;
              scrollIntoView(next.value);
            }
            e.preventDefault();
          },
        ],
        // [
        //   CODE.BACKSPACE,
        //   (e: Event) => {
        //     if (
        //       isArray(computedValue.value) &&
        //       !(e.target as HTMLInputElement).value &&
        //       computedValue.value.length
        //     ) {
        //       const newValue = [...computedValue.value];
        //       const popValue = newValue.pop();
        //       if (popValue) {
        //         const popValueOption = optionInfoMap.get(popValue);
        //         if (popValueOption && !popValueOption.disabled) {
        //           uncheckOption(popValueOption.value);
        //         }
        //       }
        //     }
        //   },
        // ],
      ])
    );

    const handleRemove = (tag: string) => {
      if (isArray(computedValue.value)) {
        const newValue = computedValue.value.filter((v) => v !== tag);
        updateValue(newValue);
        emit('remove', tag);
      }
    };

    const handleClear = (e: Event) => {
      e?.stopPropagation();
      if (isArray(computedValue.value)) {
        // Keep the option value that has been selected but disabled
        const newValue = computedValue.value.filter((v) => {
          const optionInfo = optionInfoMap.get(v);
          return Boolean(optionInfo?.disabled);
        });
        updateValue(newValue);
      } else {
        updateValue('');
      }
      handleInputValueChange('', 'manual');
      emit('clear');
    };

    // Handling when the drop-down box is displayed/hide
    watch(computedPopupVisible, (visible) => {
      if (visible) {
        const currentValue = isArray(computedValue.value)
          ? computedValue.value[0]
          : computedValue.value;
        activeOption.value = enabledOptionSet.has(currentValue)
          ? optionInfoMap.get(currentValue)
          : optionInfoMap.get(Array.from(enabledOptionSet)[0]);
        // Execute scrollIntoView after the pop-up animation ends, otherwise unnecessary scrolling will occur
        nextTick(() => {
          if (activeOption.value?.value) {
            scrollIntoView(activeOption.value.value);
          }
        });
      } else if (!retainInputValue.value) {
        handleInputValueChange('', 'optionListHide');
      }
    });

    const getOptionContentFunc = (item: OptionNode) => {
      if (isFunction(slots.option) && item.value) {
        const optionInfo = optionInfoMap.get(item.value);
        const optionSlot = slots.option;
        return () => optionSlot({ data: optionInfo });
      }
      if (isFunction(item.render)) {
        return item.render;
      }
      return () => item.label;
    };

    const renderOption = (item: OptionNode) => {
      if (item.type === 'optGroup') {
        return createVNode(DropDownOptGroup, {
          key: item.key,
          label: item.label,
        });
      }
      const { value = '' } = item;
      const isSelected = isArray(computedValue.value)
        ? computedValue.value.includes(value)
        : value === computedValue.value;
      return createVNode(
        DropDownOption,
        {
          // @ts-ignore
          ref: (ref: ComponentPublicInstance) => {
            if (ref?.$el) {
              optionRefs.value[value] = ref.$el;
            }
          },
          key: item.key,
          value: item.value,
          disabled: item.disabled,
          isSelected,
          isActive: activeOption.value && value === activeOption.value.value,
          multiple: props.multiple,
          onClick: handleSelect,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
        },
        {
          default: getOptionContentFunc(item),
        }
      );
    };

    const renderDropDown = () => {
      return (
        <Dropdown
          ref={dropdownRef}
          v-slots={{
            empty: slots.empty,
            footer: slots.footer,
          }}
          class={`${prefixCls}-dropdown`}
          loading={props.loading}
          isEmpty={optionNodes.value.length === 0}
          onScroll={handleDropdownScroll}
          onReachBottom={handleDropdownReachBottom}
          virtualList={Boolean(props.virtualListProps)}
        >
          {props.virtualListProps ? (
            <VirtualList
              ref={virtualListRef}
              {...props.virtualListProps}
              data={optionNodes.value}
              v-slots={{
                item: ({ item }: { item: OptionNode }) => renderOption(item),
              }}
            />
          ) : (
            optionNodes.value.map((item) => renderOption(item))
          )}
        </Dropdown>
      );
    };

    return () => (
      <Trigger
        v-slots={{ content: renderDropDown }}
        trigger={'click'}
        disabled={props.disabled}
        position="bl"
        popupOffset={4}
        animationName={'slide-dynamic-origin'}
        popupVisible={computedPopupVisible.value}
        unmountOnClose={props.unmountOnClose}
        hideEmpty={true}
        preventFocus={true}
        popupContainer={props.popupContainer}
        onPopupVisibleChange={handlePopupVisibleChange}
        autoFitPopupWidth
        autoFitTransformOrigin
        {...props.triggerProps}
      >
        <SelectView
          v-slots={{ label: slots.label }}
          modelValue={getValueDataFromModelValue(
            computedValue.value,
            optionInfoMap
          )}
          inputValue={computedInputValue.value}
          multiple={props.multiple}
          disabled={props.disabled}
          error={props.error}
          allowClear={props.allowClear}
          allowCreate={props.allowCreate}
          allowSearch={props.allowSearch}
          opened={computedPopupVisible.value}
          maxTagCount={props.maxTagCount}
          placeholder={props.placeholder}
          size={props.size}
          formatLabel={props.formatLabel}
          onInputValueChange={handleInputValueChange}
          onRemove={handleRemove}
          onClear={handleClear}
          onKeydown={handleKeyDown}
          {...attrs}
        />
      </Trigger>
    );
  },
});
