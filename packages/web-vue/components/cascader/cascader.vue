<template>
  <trigger
    v-bind="triggerProps"
    trigger="click"
    animation-name="slide-dynamic-origin"
    auto-fit-transform-origin
    :popup-visible="computedPopupVisible"
    position="bl"
    :disabled="mergedDisabled"
    :popup-offset="4"
    :auto-fit-popup-width="showSearchPanel"
    :popup-container="popupContainer"
    :prevent-focus="true"
    :click-to-close="!allowSearch"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <select-view
      :model-value="selectViewValue"
      :input-value="computedInputValue"
      :disabled="mergedDisabled"
      :error="error"
      :multiple="multiple"
      :allow-clear="allowClear"
      :allow-search="allowSearch"
      :size="size"
      :opened="computedPopupVisible"
      :placeholder="placeholder"
      :loading="loading"
      :max-tag-count="maxTagCount"
      v-bind="$attrs"
      @input-value-change="handleInputValueChange"
      @clear="handleClear"
      @focus="handleFocus"
      @blur="handleBlur"
      @remove="handleRemove"
      @keydown="handleKeyDown"
    >
      <template v-if="$slots.label" #label="data">
        <slot name="label" v-bind="data" />
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots['arrow-icon']" #arrow-icon>
        <slot name="arrow-icon" />
      </template>
      <template v-if="$slots['loading-icon']" #loading-icon>
        <slot name="loading-icon" />
      </template>
      <template v-if="$slots['search-icon']" #search-icon>
        <slot name="search-icon" />
      </template>
    </select-view>
    <template #content>
      <cascader-search-panel
        v-if="showSearchPanel"
        :options="filteredLeafOptions"
        :active-key="activeKey"
        :multiple="multiple"
        :check-strictly="checkStrictly"
        :loading="loading"
        :path-label="!searchOptionOnlyLabel"
      >
        <template v-if="$slots.empty" #empty>
          <slot name="empty" />
        </template>
      </cascader-search-panel>
      <base-cascader-panel
        v-else
        :display-columns="displayColumns"
        :selected-path="selectedPath"
        :active-key="activeKey"
        :multiple="multiple"
        :total-level="totalLevel"
        :check-strictly="checkStrictly"
        :loading="loading"
        dropdown
      >
        <template v-if="$slots.empty" #empty>
          <slot name="empty" />
        </template>
      </base-cascader-panel>
    </template>
  </trigger>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import {
  getCheckedStatus,
  getLeafOptionInfos,
  getLeafOptionKeys,
  getOptionInfos,
  getOptionLabel,
  getValidValues,
  getValueKey,
} from './utils';
import Trigger, { TriggerProps } from '../trigger';
import SelectView from '../_components/select-view/select-view';
import BaseCascaderPanel from './base-cascader-panel';
import CascaderSearchPanel from './cascader-search-panel';
import {
  CascaderFieldNames,
  CascaderOption,
  CascaderOptionInfo,
} from './interface';
import { isArray, isFunction, isNull, isUndefined } from '../_utils/is';
import { BaseType, Data, UnionType } from '../_utils/types';
import { useSelectedPath } from './hooks/use-selected-path';
import { KEYBOARD_KEY, getKeyDownHandler } from '../_utils/keyboard';
import { cascaderInjectionKey } from './context';
import { Size } from '../_utils/constant';
import { debounce } from '../_utils/debounce';
import { useFormItem } from '../_hooks/use-form-item';

export default defineComponent({
  name: 'Cascader',
  components: {
    Trigger,
    SelectView,
    BaseCascaderPanel,
    CascaderSearchPanel,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 绑定值是否为路径
     * @en Whether the value is a path
     */
    pathMode: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为多选状态（多选模式默认开启搜索）
     * @en Whether it is a multi-selection state (The search is turned on by default in the multi-select mode)
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
        | (
            | string
            | number
            | Record<string, any>
            | (string | number | Record<string, any>)[]
          )[]
        | undefined
      >,
    },
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     * @defaultValue '' \| undefined \| []
     */
    defaultValue: {
      type: [String, Number, Object, Array] as PropType<
        | string
        | number
        | Record<string, any>
        | (
            | string
            | number
            | Record<string, any>
            | (string | number | Record<string, any>)[]
          )[]
        | undefined
      >,
      default: (props: Data) =>
        props.multiple ? [] : props.pathMode ? undefined : '',
    },
    /**
     * @zh 级联选择器的选项
     * @en Options for cascader
     */
    options: {
      type: Array as PropType<CascaderOption[]>,
      default: () => [],
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
     * @zh 选择框的大小
     * @en The size of the select
     * @values 'mini', 'small', 'medium', 'large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 是否允许搜索
     * @en Whether to allow searching
     * @defaultValue false (single) \| true (multiple)
     */
    allowSearch: {
      type: Boolean,
      default: (props: Data) => Boolean(props.multiple),
    },
    /**
     * @zh 是否允许清除
     * @en Whether to allow clear
     */
    allowClear: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 输入框的值
     * @en The value of the input
     * @vModel
     */
    inputValue: {
      type: String,
      default: undefined,
    },
    /**
     * @zh 输入框的默认值（非受控状态）
     * @en The default value of the input (uncontrolled state)
     */
    defaultInputValue: {
      type: String,
      default: '',
    },
    /**
     * @zh 是否显示下拉框
     * @en Whether to show the dropdown
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 展开下一级的触发方式
     * @en Expand the trigger method of the next level
     */
    expandTrigger: {
      type: String as PropType<'click' | 'hover'>,
      default: 'click',
    },
    /**
     * @zh 是否默认显示下拉框（非受控状态）
     * @en Whether to display the dropdown by default (uncontrolled state)
     */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 占位符
     * @en Placeholder
     */
    placeholder: String,
    /**
     * @zh 自定义选项过滤方法
     * @en Custom options filter method
     */
    filterOption: {
      type: Function as PropType<
        (inputValue: string, option: CascaderOption) => boolean
      >,
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
     * @zh 多选模式下，最多显示的标签数量。0 表示不限制
     * @en In multi-select mode, the maximum number of labels displayed. 0 means unlimited
     */
    maxTagCount: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 格式化展示内容
     * @en Format display content
     */
    formatLabel: {
      type: Function as PropType<(options: CascaderOption[]) => string>,
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
     * @zh 是否开启严格选择模式
     * @en Whether to enable strict selection mode
     */
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 数据懒加载函数，传入时开启懒加载功能
     * @en Data lazy loading function, open the lazy loading function when it is passed in
     * @version 2.13.0
     */
    loadMore: {
      type: Function as PropType<
        (
          option: CascaderOption,
          done: (children?: CascaderOption[]) => void
        ) => void
      >,
    },
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     * @version 2.15.0
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 搜索下拉菜单中的选项是否仅展示标签
     * @en Whether the options in the search dropdown show only label
     * @version 2.18.0
     */
    searchOptionOnlyLabel: {
      type: Boolean,
      default: false,
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
     * @zh 自定义 `CascaderOption` 中的字段
     * @en Customize fields in `CascaderOption`
     * @version 2.22.0
     */
    fieldNames: {
      type: Object as PropType<CascaderFieldNames>,
    },
    /**
     * @zh 用于确定选项键值的属性名
     * @en Used to determine the option key value attribute name
     * @version 2.29.0
     */
    valueKey: {
      type: String,
      default: 'value',
    },
    /**
     * @zh 自定义不存在选项的值的展示
     * @en Options that do not exist in custom values
     * @version 2.29.0
     */
    fallback: {
      type: [Boolean, Function] as PropType<
        | boolean
        | ((
            value:
              | string
              | number
              | Record<string, unknown>
              | (string | number | Record<string, unknown>)[]
          ) => string)
      >,
      default: true,
    },
    /**
     * @zh 是否展开子菜单
     * @en whether to expand the submenu
     * @version 2.29.0
     */
    expandChild: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (
      value:
        | string
        | number
        | Record<string, any>
        | (
            | string
            | number
            | Record<string, any>
            | (string | number | Record<string, any>)[]
          )[]
        | undefined
    ) => true,
    'update:popupVisible': (visible: boolean) => true,
    /**
     * @zh 选中值改变时触发
     * @en Triggered when the selected value changes
     * @property {string | number | (string | number | (string | number)[])[] | undefined} value
     */
    'change': (
      value:
        | string
        | number
        | Record<string, any>
        | (
            | string
            | number
            | Record<string, any>
            | (string | number | Record<string, any>)[]
          )[]
        | undefined
    ) => true,
    /**
     * @zh 输入值改变时触发
     * @en Triggered when the input value changes
     * @property {string} value
     */
    'inputValueChange': (value: string) => true,
    /**
     * @zh 点击清除按钮时触发
     * @en Triggered when the clear button is clicked
     */
    'clear': () => true,
    /**
     * @zh 用户搜索时触发
     * @en Triggered when the user searches
     * @property {string} value
     */
    'search': (value: string) => true,
    /**
     * @zh 下拉框的显示状态改变时触发
     * @en Triggered when the display state of the dropdown changes
     * @property {boolean} visible
     */
    'popupVisibleChange': (visible: boolean) => true,
    /**
     * @zh 获得焦点时触发
     * @en Triggered when focus
     * @param {FocusEvent} ev
     */
    'focus': (ev: FocusEvent) => true,
    /**
     * @zh 失去焦点时触发
     * @en Triggered when blur
     * @param {FocusEvent} ev
     */
    'blur': (ev: FocusEvent) => true,
  },
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
   * @zh 选项内容
   * @en Display content of options
   * @slot option
   * @binding {CascaderOption} data
   * @version 2.18.0
   */
  /**
   * @zh 选择框的显示内容
   * @en Display content of label
   * @slot label
   * @binding {CascaderOption} data
   * @version 2.18.0
   */
  /**
   * @zh 选项为空时的显示内容
   * @en Display content when the option is empty
   * @slot empty
   * @version 2.23.0
   */
  /**
   * @zh 前缀元素
   * @en Prefix
   * @slot prefix
   * @version 2.23.0
   */
  setup(props, { emit, slots }) {
    const {
      options,
      checkStrictly,
      loadMore,
      formatLabel,
      modelValue,
      disabled,
      valueKey,
      expandTrigger,
      expandChild,
    } = toRefs(props);
    const _value = ref(props.defaultValue);
    const _inputValue = ref(props.defaultInputValue);
    const _popupVisible = ref(props.defaultPopupVisible);

    const { mergedDisabled, eventHandlers } = useFormItem({ disabled });

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = props.multiple ? [] : undefined;
      }
    });

    const optionInfos = ref<CascaderOptionInfo[]>([]);
    const totalLevel = ref(1);

    const optionMap = reactive(new Map<string, CascaderOptionInfo>());
    const leafOptionMap = reactive(new Map<string, CascaderOptionInfo>());
    const leafOptionValueMap = reactive(new Map<BaseType, string>());
    const leafOptionSet = reactive(new Set<CascaderOptionInfo>());

    const lazyLoadOptions = reactive<Record<string, CascaderOption[]>>({});

    const addLazyLoadOptions = (children: CascaderOption[], key: string) => {
      lazyLoadOptions[key] = children;
    };

    const DEFAULT_FIELD_NAMES = {
      value: 'value',
      label: 'label',
      disabled: 'disabled',
      children: 'children',
      tagProps: 'tagProps',
      render: 'render',
      isLeaf: 'isLeaf',
    };

    const mergedFieldNames = computed(() => ({
      ...DEFAULT_FIELD_NAMES,
      ...props.fieldNames,
    }));

    watch(
      [options, lazyLoadOptions, mergedFieldNames],
      ([_options, _lazyLoadOptions, _fieldNames]) => {
        optionMap.clear();
        leafOptionMap.clear();
        leafOptionValueMap.clear();
        leafOptionSet.clear();

        optionInfos.value = getOptionInfos(_options ?? [], {
          enabledLazyLoad: Boolean(props.loadMore),
          lazyLoadOptions,
          optionMap,
          leafOptionSet,
          leafOptionMap,
          leafOptionValueMap,
          totalLevel,
          checkStrictly,
          valueKey,
          fieldNames: _fieldNames,
        });
      },
      {
        immediate: true,
        deep: true,
      }
    );

    const computedValueMap = computed(() => {
      const values = getValidValues(props.modelValue ?? _value.value, {
        multiple: props.multiple,
        pathMode: props.pathMode,
      });
      return new Map(
        values.map((value) => [
          getValueKey(value, {
            valueKey: props.valueKey,
            leafOptionValueMap,
          }),
          value,
        ])
      );
    });

    const computedInputValue = computed(
      () => props.inputValue ?? _inputValue.value
    );
    const computedPopupVisible = computed(
      () => props.popupVisible ?? _popupVisible.value
    );

    const getFilteredStatus = (label: string) => {
      return label
        ?.toLocaleLowerCase()
        .includes(computedInputValue.value?.toLocaleLowerCase());
    };

    const filteredLeafOptions = computed(() => {
      const options = props.checkStrictly
        ? Array.from(optionMap.values())
        : Array.from(leafOptionSet);

      return options.filter((item) => {
        if (isFunction(props.filterOption)) {
          return props.filterOption(computedInputValue.value, item.raw);
        }

        if (props.checkStrictly) {
          return getFilteredStatus(item.label);
        }

        return item.path?.find((leaf) => getFilteredStatus(leaf.label));
      });
    });

    const updateValue = (values: UnionType[] | UnionType[][]) => {
      const value = props.multiple ? values : values[0] ?? '';
      if (values.length === 0) {
        setSelectedPath();
        setActiveKey();
      }

      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value);
      eventHandlers.value?.onChange?.();
    };

    const handlePopupVisibleChange = (visible: boolean): void => {
      if (computedPopupVisible.value !== visible) {
        _popupVisible.value = visible;
        emit('popupVisibleChange', visible);
      }
    };

    const handleRemove = (key: string) => {
      if (props.multiple) {
        const option = leafOptionMap.get(key);
        if (option) {
          selectMultiple(option, false);
        } else {
          const values: any[] = [];
          computedValueMap.value.forEach((value, _key) => {
            if (_key !== key) {
              values.push(value);
            }
          });
          updateValue(values);
        }
      }
    };

    const selectSingle = (option: CascaderOptionInfo) => {
      updateValue([props.pathMode ? option.pathValue : option.value]);
      handlePopupVisibleChange(false);
    };

    const selectMultiple = (option: CascaderOptionInfo, checked: boolean) => {
      if (checked) {
        const leafOptionInfos = props.checkStrictly
          ? [option]
          : getLeafOptionInfos(option);

        updateValue([
          ...computedValueMap.value.values(),
          ...leafOptionInfos
            .filter((item) => !computedValueMap.value.has(item.key))
            .map((item) => {
              return props.pathMode ? item.pathValue : item.value;
            }),
        ]);
      } else {
        const leafOptionKeys = props.checkStrictly
          ? [option.key]
          : getLeafOptionKeys(option);
        const values: any[] = [];
        computedValueMap.value.forEach((value, key) => {
          if (!leafOptionKeys.includes(key)) {
            values.push(value);
          }
        });
        updateValue(values);
      }

      handleInputValueChange('', 'optionChecked');
    };

    const handleClickOption = (
      option: CascaderOptionInfo,
      checked?: boolean
    ) => {
      if (props.multiple) {
        selectMultiple(option, checked ?? true);
      } else {
        selectSingle(option);
      }
    };

    const handleSearch = debounce((value: string) => {
      emit('search', value);
    }, props.searchDelay);

    const handleInputValueChange = (value: string, reason: string): void => {
      if (value !== computedInputValue.value) {
        if (reason === 'manual' && !computedPopupVisible.value) {
          _popupVisible.value = true;
          emit('popupVisibleChange', true);
        }

        _inputValue.value = value;
        emit('inputValueChange', value);

        if (props.allowSearch) {
          handleSearch(value);
        }
      }
    };

    watch(computedPopupVisible, (value) => {
      if (value) {
        if (computedValueMap.value.size > 0) {
          const keys = Array.from(computedValueMap.value.keys());
          const lastKey = keys[keys.length - 1];
          const option = leafOptionMap.get(lastKey);
          if (option && option.key !== activeKey.value) {
            setSelectedPath(option.key);
            setActiveKey(option.key);
          }
        }
      } else {
        if (computedValueMap.value.size === 0) {
          setSelectedPath();
          setActiveKey();
        }
        handleInputValueChange('', 'optionListHide');
      }
    });

    const handleClear = (e: MouseEvent) => {
      e.stopPropagation();
      if (props.multiple) {
        // 保留已经被选中但被disabled的选项值
        const newValues: any[] = [];
        computedValueMap.value.forEach((value, key) => {
          const option = leafOptionMap.get(key);
          if (option?.disabled) {
            newValues.push(props.pathMode ? option.pathValue : option.value);
          }
        });
        updateValue(newValues);
      } else {
        updateValue([]);
      }
      handleInputValueChange('', 'manual');
      emit('clear');
    };

    const showSearchPanel = computed(
      () => props.allowSearch && computedInputValue.value.length > 0
    );

    const handleFocus = (e: FocusEvent) => {
      emit('focus', e);
    };
    const handleBlur = (e: FocusEvent) => {
      emit('blur', e);
    };

    const {
      activeKey,
      activeOption,
      selectedPath,
      displayColumns,
      setActiveKey,
      setSelectedPath,
      getNextActiveNode,
    } = useSelectedPath(optionInfos, {
      optionMap,
      filteredLeafOptions,
      showSearchPanel,
      expandChild,
    });

    provide(
      cascaderInjectionKey,
      reactive({
        onClickOption: handleClickOption,
        setActiveKey,
        setSelectedPath,
        loadMore,
        expandTrigger,
        addLazyLoadOptions,
        formatLabel,
        slots,
        valueMap: computedValueMap,
      })
    );

    const handleKeyDown = getKeyDownHandler(
      new Map([
        [
          KEYBOARD_KEY.ENTER,
          (ev: Event) => {
            if (computedPopupVisible.value) {
              if (activeOption.value) {
                let checked: boolean;
                if (props.checkStrictly || activeOption.value.isLeaf) {
                  checked = !computedValueMap.value.has(activeOption.value.key);
                } else {
                  checked = !getCheckedStatus(
                    activeOption.value,
                    computedValueMap.value
                  ).checked;
                }
                setSelectedPath(activeOption.value.key);
                handleClickOption(activeOption.value, checked);
              }
            } else {
              handlePopupVisibleChange(true);
            }
          },
        ],
        [
          KEYBOARD_KEY.ESC,
          (ev: Event) => {
            handlePopupVisibleChange(false);
          },
        ],
        [
          KEYBOARD_KEY.ARROW_DOWN,
          (ev: Event) => {
            ev.preventDefault();
            const activeNode = getNextActiveNode('next');
            setActiveKey(activeNode?.key);
          },
        ],
        [
          KEYBOARD_KEY.ARROW_UP,
          (ev: Event) => {
            ev.preventDefault();
            const activeNode = getNextActiveNode('preview');
            setActiveKey(activeNode?.key);
          },
        ],
        [
          KEYBOARD_KEY.ARROW_RIGHT,
          (ev: Event) => {
            if (!showSearchPanel.value) {
              ev.preventDefault();
              if (activeOption.value?.children) {
                setSelectedPath(activeOption.value.key);
                setActiveKey(activeOption.value.children[0]?.key);
              }
            }
          },
        ],
        [
          KEYBOARD_KEY.ARROW_LEFT,
          (ev: Event) => {
            if (!showSearchPanel.value) {
              ev.preventDefault();
              if (activeOption.value?.parent) {
                setSelectedPath(activeOption.value.parent.key);
                setActiveKey(activeOption.value.parent.key);
              }
            }
          },
        ],
      ])
    );

    const selectViewValue = computed(() => {
      const result: any[] = [];
      computedValueMap.value.forEach((value, key) => {
        const option = leafOptionMap.get(key);
        if (option) {
          result.push({
            value: key,
            label:
              props.formatLabel?.(option.path.map((item) => item.raw)) ??
              getOptionLabel(option),
            closable: !option.disabled,
            tagProps: option.tagProps,
          });
        } else if (props.fallback) {
          const label = isFunction(props.fallback)
            ? props.fallback(value)
            : isArray(value)
            ? value.join(' / ')
            : String(value);
          result.push({
            value: key,
            label,
            closable: true,
          });
        }
      });
      return result;
    });

    return {
      optionInfos,
      filteredLeafOptions,
      selectedPath,
      activeKey,
      displayColumns,
      computedInputValue,
      computedPopupVisible,
      handleClear,
      selectViewValue,
      handleInputValueChange,
      showSearchPanel,
      handlePopupVisibleChange,
      handleFocus,
      handleBlur,
      handleRemove,
      mergedDisabled,
      handleKeyDown,
      totalLevel,
    };
  },
});
</script>
