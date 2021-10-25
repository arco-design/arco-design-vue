<template>
  <trigger
    trigger="click"
    :popup-visible="computedPopupVisible"
    position="bl"
    :disabled="disabled"
    :popup-offset="4"
    :auto-fit-popup-width="showSearchPanel"
    :popup-container="popupContainer"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <select-view
      :model-value="selectViewValue"
      :input-value="computedInputValue"
      :disabled="disabled"
      :error="error"
      :multiple="multiple"
      :allow-clear="allowClear"
      :allow-search="allowSearch"
      :opened="computedPopupVisible"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input-value-change="handleInputValueChange"
      @clear="handleClear"
      @focus="handleFocus"
      @blur="handleBlur"
      @remove="handleRemove"
      @keydown="handleKeyDown"
    />
    <template #content>
      <cascader-search-panel
        v-if="showSearchPanel"
        :options="filteredLeafOptions"
        :active-node="activeNode"
        :computed-keys="computedKeys"
        :multiple="multiple"
        @click-option="handleClickOption"
        @active-change="setActiveNode"
      />
      <cascader-panel
        v-else
        :display-columns="displayColumns"
        :selected-path="selectedPath"
        :active-node="activeNode"
        :computed-keys="computedKeys"
        :multiple="multiple"
        :expand-trigger="expandTrigger"
        @click-option="handleClickOption"
        @active-change="setActiveNode"
        @path-change="setSelectedPath"
      />
    </template>
  </trigger>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { getKeysFromValue, getLeafOptionKeys, getOptionInfos } from './utils';
import Trigger from '../trigger';
import SelectView from '../_components/select-view/select-view';
import CascaderPanel from './cascader-panel';
import CascaderSearchPanel from './cascader-search-panel';
import { CascaderOption, CascaderOptionInfo } from './interface';
import { isArray } from '../_utils/is';
import { InputValueChangeReason } from '../select/select';
import { Data } from '../_utils/types';
import { useSelectedPath } from './hooks/use-selected-path';
import { CODE, getKeyDownHandler } from '../_utils/keyboard';

export default defineComponent({
  name: 'Cascader',
  components: {
    Trigger,
    SelectView,
    CascaderPanel,
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
     * @zh 是否为多选状态
     * @en Whether it is a multi-selection state
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
      type: [String, Array] as PropType<
        string | string[] | undefined | (string | string[])[]
      >,
    },
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     * @defaultValue '' | undefined | []
     */
    defaultValue: {
      type: [String, Array] as PropType<
        string | string[] | undefined | (string | string[])[]
      >,
      default: (props: Data) =>
        props.multiple ? [] : props.mode === 'value' ? '' : undefined,
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
     * @zh 是否允许搜索
     * @en Whether to allow searching
     */
    allowSearch: {
      type: Boolean,
      default: false,
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
      type: String,
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
    filterOption: {
      type: Function as PropType<
        (inputValue: string, optionInfo: CascaderOptionInfo) => boolean
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
     * @zh 格式化展示内容
     * @en Format display content
     */
    formatLabel: {
      type: Function as PropType<(options: CascaderOptionInfo[]) => string>,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 选中值改变时触发
     * @en Triggered when the selected value changes
     * @property {string | string[] | undefined | (string | string[])[]} value
     */
    'change',
    /**
     * @zh 输入值改变时触发
     * @en Triggered when the input value changes
     * @property {string} value
     */
    'inputValueChange',
    /**
     * @zh 点击清除按钮时触发
     * @en Triggered when the clear button is clicked
     */
    'clear',
    /**
     * @zh 用户搜索时触发
     * @en Triggered when the user searches
     * @property {string} value
     */
    'search',
    /**
     * @zh 下拉框的显示状态改变时触发
     * @en Triggered when the display state of the dropdown changes
     * @property {boolean} visible
     */
    'popupVisibleChange',
    /**
     * @zh 获得焦点时触发
     * @en Triggered when focus
     */
    'focus',
    /**
     * @zh 失去焦点时触发
     * @en Triggered when blur
     */
    'blur',
  ],
  setup(props, { emit }) {
    const { options } = toRefs(props);
    const _value = ref(props.defaultValue);
    const _inputValue = ref(props.defaultInputValue);
    const _popupVisible = ref(props.defaultPopupVisible);

    const optionInfos = ref<CascaderOptionInfo[]>([]);
    const leafOptionSet = new Set<CascaderOptionInfo>();
    const leafOptionMap = new Map<string, CascaderOptionInfo>();
    const leafOptionValueMap = new Map<string, CascaderOptionInfo>();

    watch(
      options,
      (_options) => {
        leafOptionSet.clear();
        leafOptionMap.clear();
        leafOptionValueMap.clear();
        optionInfos.value = getOptionInfos(props.options, {
          leafOptionSet,
          leafOptionMap,
          leafOptionValueMap,
        });
      },
      {
        immediate: true,
      }
    );

    const computedKeys = computed(() =>
      getKeysFromValue(props.modelValue ?? _value.value, {
        pathMode: props.pathMode,
        leafOptionMap,
        leafOptionValueMap,
      })
    );

    const computedInputValue = computed(
      () => props.inputValue ?? _inputValue.value
    );
    const computedPopupVisible = computed(
      () => props.popupVisible ?? _popupVisible.value
    );

    const filteredLeafOptions = computed(() =>
      Array.from(leafOptionSet).filter(
        (item) =>
          props.filterOption?.(computedInputValue.value, item) ??
          item.label?.includes(computedInputValue.value)
      )
    );

    const updateValue = (
      options?: CascaderOptionInfo | CascaderOptionInfo[]
    ) => {
      let value: string | string[] | undefined | (string | string[])[];
      if (!options) {
        if (!props.pathMode) {
          value = '';
        }
        setSelectedPath();
        setActiveNode();
      } else if (isArray(options)) {
        value = options.map((item) => {
          if (!props.pathMode) {
            return item.value;
          }
          return item.path.map((item) => item.value);
        });
      } else if (!props.pathMode) {
        value = options.value;
      } else {
        value = options.path.map((item) => item.value);
      }

      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value);
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
        }
      }
    };

    const selectSingle = (option: CascaderOptionInfo) => {
      updateValue(option);
      handlePopupVisibleChange(false);
    };

    const selectMultiple = (option: CascaderOptionInfo, checked: boolean) => {
      const leafOptionKeys = getLeafOptionKeys(option);

      const newKeys = checked
        ? computedKeys.value.concat(
            leafOptionKeys.filter((item) => !computedKeys.value.includes(item))
          )
        : computedKeys.value.filter((item) => !leafOptionKeys.includes(item));

      updateValue(
        newKeys.map((key) => leafOptionMap.get(key) as CascaderOptionInfo)
      );
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

    const getOptionLabel = (option: CascaderOptionInfo) => {
      return option.path.map((item) => item.label).join(' / ');
    };

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

    watch(computedPopupVisible, (value) => {
      if (value) {
        if (computedKeys.value.length > 0 && !activeNode.value) {
          const lastKey = computedKeys.value[computedKeys.value.length - 1];
          const node = leafOptionMap.get(lastKey);
          if (node) {
            setSelectedPath(node);
            setActiveNode(node);
          }
        }
      } else {
        handleInputValueChange('', 'optionListHide');
      }
    });

    const handleClear = (e: MouseEvent) => {
      e.stopPropagation();
      if (props.multiple) {
        // 保留已经被选中但被disabled的选项值
        const newValue = computedKeys.value.reduce((pre, key) => {
          const option = leafOptionMap.get(key);
          if (option?.disabled) {
            pre.push(option);
          }
          return pre;
        }, [] as CascaderOptionInfo[]);
        updateValue(newValue);
      } else {
        updateValue();
      }
      handleInputValueChange('', 'manual');
      emit('clear');
    };

    const showSearchPanel = computed(
      () => props.allowSearch && computedInputValue.value.length > 0
    );

    const handleFocus = (e: Event) => {
      emit('focus', e);
    };
    const handleBlur = (e: Event) => {
      emit('blur', e);
    };

    const {
      selectedPath,
      activeNode,
      displayColumns,
      setSelectedPath,
      setActiveNode,
      getNextActiveNode,
    } = useSelectedPath(optionInfos, { filteredLeafOptions, showSearchPanel });

    // TODO: 添加滚动支持和虚拟列表
    // const panelRef = ref();
    //
    // const scrollIntoView = (key: string, level: number) => {
    //   const wrapperEle = panelRef.value?.$refs?.panelRefs?.[
    //     level
    //   ] as HTMLElement;
    //   const optionEle = panelRef.value?.$refs?.optionRefs?.[key] as HTMLElement;
    //
    //   if (!wrapperEle || !optionEle) {
    //     return;
    //   }
    //   if (wrapperEle.scrollHeight === wrapperEle.offsetHeight) {
    //     return;
    //   }
    //   const optionRect = getRelativeRect(optionEle, wrapperEle);
    //   const wrapperScrollTop = wrapperEle.scrollTop;
    //
    //   if (optionRect.top < 0) {
    //     wrapperEle.scrollTo(0, wrapperScrollTop + optionRect.top);
    //   } else if (optionRect.bottom < 0) {
    //     wrapperEle.scrollTo(0, wrapperScrollTop - optionRect.bottom);
    //   }
    // };

    const handleKeyDown = getKeyDownHandler(
      new Map([
        [
          CODE.ENTER,
          (e) => {
            if (computedPopupVisible.value) {
              if (activeNode.value) {
                handleClickOption(activeNode.value);
              }
            } else {
              handlePopupVisibleChange(true);
            }
          },
        ],
        [
          CODE.ESC,
          (e) => {
            handlePopupVisibleChange(false);
          },
        ],
        [
          CODE.ARROW_DOWN,
          (e) => {
            const activeNode = getNextActiveNode('next');
            setActiveNode(activeNode);
            e?.preventDefault();
          },
        ],
        [
          CODE.ARROW_UP,
          (e) => {
            const activeNode = getNextActiveNode('preview');
            setActiveNode(activeNode);
            e?.preventDefault();
          },
        ],
        [
          CODE.ARROW_RIGHT,
          (e) => {
            if (activeNode.value?.children) {
              setSelectedPath(activeNode.value);
              setActiveNode(activeNode.value?.children[0]);
            }
            e?.preventDefault();
          },
        ],
        [
          CODE.ARROW_LEFT,
          (e) => {
            if (activeNode.value?.parent) {
              setActiveNode(activeNode.value?.parent);
              setSelectedPath(activeNode.value?.parent);
            }
            e?.preventDefault();
          },
        ],
      ])
    );

    const selectViewValue = computed(() => {
      if (props.multiple) {
        const result = [];
        for (const key of computedKeys.value) {
          const option = leafOptionMap.get(key);
          if (option) {
            const value = {
              value: key,
              label: getOptionLabel(option),
              closable: !option.disabled,
            };
            result.push(value);
          }
        }
        return result;
      }
      const option = leafOptionMap.get(computedKeys.value[0]);

      if (!option) {
        return undefined;
      }

      return {
        value: option.key,
        label: props.formatLabel?.(option.path) ?? getOptionLabel(option),
        closable: !option?.disabled,
      };
    });

    return {
      optionInfos,
      computedKeys,
      filteredLeafOptions,
      selectedPath,
      activeNode,
      displayColumns,
      computedInputValue,
      computedPopupVisible,
      handleClear,
      setSelectedPath,
      setActiveNode,
      selectViewValue,
      handleInputValueChange,
      showSearchPanel,
      handlePopupVisibleChange,
      handleFocus,
      handleClickOption,
      handleBlur,
      handleRemove,
      handleKeyDown,
    };
  },
});
</script>
