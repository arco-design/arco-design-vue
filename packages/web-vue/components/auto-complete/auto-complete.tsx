import {
  computed,
  defineComponent,
  ref,
  PropType,
  toRefs,
  ComponentPublicInstance,
} from 'vue';
import ArcoInput from '../input';
import Trigger from '../trigger';
import { getPrefixCls } from '../_utils/global-config';
import { useOptions } from '../_hooks/use-options';
import {
  Option,
  OptionInfo,
  FilterOption,
  OptionNode,
} from '../select/interface';
import { isFunction } from '../_utils/is';
import { DropdownPanel, DropDownOption } from '../_components/dropdown';
import { CODE, getKeyDownHandler } from '../_utils/keyboard';
import { EmitType } from '../_utils/types';

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
      type: Array as PropType<Option[]>,
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
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<EmitType<(value: string) => void>>,
    },
    onSearch: {
      type: [Function, Array] as PropType<EmitType<(value: string) => void>>,
    },
    onSelect: {
      type: [Function, Array] as PropType<EmitType<(value: string) => void>>,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 绑定值发生改变时触发
     * @en Emitted when the value changes
     * @property {string} value
     */
    'change',
    /**
     * @zh 用户搜索时触发
     * @en Emitted when the user searches
     * @property {string} value
     */
    'search',
    /**
     * @zh 选择选项时触发
     * @en Emitted when an option is selected
     * @property {string} value
     */
    'select',
  ],
  setup(props, { emit, attrs }) {
    const prefixCls = getPrefixCls('auto-complete');
    const _value = ref(props.defaultValue);
    const inputRef = ref<HTMLInputElement>();
    const computedValue = computed(() => props.modelValue ?? _value.value);
    const { data } = toRefs(props);
    const dropdownRef = ref();
    const optionRefs = ref<Record<string, HTMLElement>>({});

    const strictFilterOption: FilterOption = (
      inputValue: string,
      optionInfo: OptionInfo
    ) => {
      return optionInfo.label.includes(inputValue);
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
    const extraOptions = ref([]);

    const {
      nodes,
      optionInfoMap,
      activeOption,
      getNextActiveOption,
      scrollIntoView,
    } = useOptions({
      options: data,
      extraOptions,
      inputValue: computedValue,
      filterOption: mergedFilterOption,
      dropdownRef,
      optionRefs,
    });

    const handleChange = (value: string) => {
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value);
    };

    const _popupVisible = ref(false);
    const computedPopupVisible = computed(
      () => _popupVisible.value && nodes.value.length > 0
    );

    const handlePopupVisibleChange = (popupVisible: boolean) => {
      _popupVisible.value = popupVisible;
    };

    // Dropdown事件
    const handleSelect = (value: string, e: Event) => {
      emit('select', value);
      handleChange(value);
      inputRef.value?.blur();
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

    // Input事件
    const handleInputValueChange = (value: string) => {
      emit('search', value);
      handleChange(value);
    };

    const handleKeyDown = getKeyDownHandler(
      new Map([
        [
          CODE.ENTER,
          (e: Event) => {
            if (computedPopupVisible.value) {
              if (activeOption.value) {
                handleSelect(String(activeOption.value.value), e);
              }
              e.preventDefault();
            }
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
            if (computedPopupVisible.value) {
              const next = getNextActiveOption('down');
              if (next) {
                activeOption.value = next;
                scrollIntoView(next.value);
              }
              e.preventDefault();
            }
          },
        ],
        [
          CODE.ARROW_UP,
          (e: Event) => {
            if (computedPopupVisible.value) {
              const next = getNextActiveOption('up');
              if (next) {
                activeOption.value = next;
                scrollIntoView(next.value);
              }
              e.preventDefault();
            }
          },
        ],
      ])
    );

    const renderOption = (item: OptionNode) => {
      const { value = '' } = item;

      return (
        <DropDownOption
          ref={(ref: ComponentPublicInstance) => {
            if (ref?.$el) {
              optionRefs.value[value] = ref.$el;
            }
          }}
          key={item.key}
          value={value}
          disabled={item.disabled}
          isActive={activeOption.value && value === activeOption.value.value}
          onClick={handleSelect}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        >
          {item.label}
        </DropDownOption>
      );
    };

    const renderDropdown = () => {
      const _children = nodes.value.map((node) => renderOption(node));

      if (_children.length === 0) {
        return null;
      }

      return (
        <DropdownPanel ref={dropdownRef} class={`${prefixCls}-dropdown`}>
          {_children}
        </DropdownPanel>
      );
    };

    return () => (
      <Trigger
        v-slots={{ content: renderDropdown }}
        trigger="focus"
        position="bl"
        popupVisible={computedPopupVisible.value}
        clickToClose={false}
        preventFocus={true}
        popupOffset={4}
        disabled={props.disabled}
        autoFitPopupWidth
        onPopupVisibleChange={handlePopupVisibleChange}
      >
        <ArcoInput
          ref={inputRef}
          modelValue={computedValue.value}
          onInput={handleInputValueChange}
          disabled={props.disabled}
          onKeydown={handleKeyDown}
          {...attrs}
        />
      </Trigger>
    );
  },
});
