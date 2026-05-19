<template>
  <trigger
    v-bind="mergedTriggerProps"
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
    :click-to-close="!Boolean(mergedAllowSearch)"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <select-view
      :model-value="selectViewValue"
      :input-value="computedInputValue"
      :disabled="mergedDisabled"
      :error="error"
      :multiple="multiple"
      :allow-clear="mergedAllowClear"
      :allow-search="Boolean(mergedAllowSearch)"
      :size="size"
      :opened="computedPopupVisible"
      :placeholder="placeholder"
      :loading="loading"
      :max-tag-count="maxTagCount"
      :tag-nowrap="tagNowrap"
      v-bind="attrs"
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
        :virtual-list-props="resolvedVirtualListProps"
        dropdown
      >
        <template v-if="$slots.empty" #empty>
          <slot name="empty" />
        </template>
      </base-cascader-panel>
    </template>
  </trigger>
</template>

<script lang="ts" setup>
  import {
    computed,
    getCurrentInstance,
    provide,
    reactive,
    ref,
    toRefs,
    useAttrs,
    useSlots,
    watch,
  } from 'vue';

  import type {
    CascaderModelValue,
    CascaderOption,
    CascaderOptionInfo,
    CascaderSingleValue,
  } from './interface';
  import type { CascaderEmits, CascaderProps } from './types';

  import SelectView from '../_components/select-view/select-view';
  import { useAllowClear } from '../_hooks/use-allow-clear';
  import { useAllowSearch } from '../_hooks/use-allow-search';
  import { useFormItem } from '../_hooks/use-form-item';
  import { useTrigger } from '../_hooks/use-trigger';
  import { debounce } from '../_utils/debounce';
  import { isArray, isFunction, isNull, isUndefined } from '../_utils/is';
  import { KEYBOARD_KEY, getKeyDownHandler } from '../_utils/keyboard';
  import { BaseType } from '../_utils/types';
  import { resolveDropdownVirtualListProps } from '../_utils/virtual-dropdown';
  import Trigger from '../trigger';
  import BaseCascaderPanel from './base-cascader-panel';
  import CascaderSearchPanel from './cascader-search-panel';
  import { cascaderInjectionKey } from './context';
  import { useSelectedPath } from './hooks/use-selected-path';
  import {
    getCheckedStatus,
    getLeafOptionInfos,
    getLeafOptionKeys,
    getOptionInfos,
    getOptionLabel,
    getValidValues,
    getValueKey,
  } from './utils';

  defineOptions({
    name: 'Cascader',
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<CascaderProps>(), {
    pathMode: false,
    multiple: false,
    options: () => [],
    disabled: false,
    error: false,
    allowClear: false,
    defaultInputValue: '',
    expandTrigger: 'click',
    defaultPopupVisible: false,
    maxTagCount: 0,
    showPath: true,
    separator: ' / ',
    checkStrictly: false,
    loading: false,
    searchOptionOnlyLabel: false,
    searchDelay: 500,
    valueKey: 'value',
    fallback: true,
    expandChild: false,
    tagNowrap: false,
  });

  const emit = defineEmits<CascaderEmits>();
  const attrs = useAttrs();
  const slots = useSlots();

  const DEFAULT_CASCADER_VIRTUAL_ITEM_SIZE = 36;

  const getDefaultValue = (multiple: boolean, pathMode: boolean): CascaderModelValue => {
    if (multiple) {
      return [];
    }

    if (pathMode) {
      return undefined;
    }

    return '';
  };

  const {
    options,
    checkStrictly,
    loadMore,
    formatLabel,
    modelValue,
    value: valueProp,
    disabled,
    valueKey,
    expandTrigger,
    expandChild,
    pathMode,
    multiple,
    popupVisible,
    show,
    defaultPopupVisible,
    defaultShow,
    error,
    size,
    placeholder,
    loading,
    maxTagCount,
    tagNowrap,
    popupContainer,
    searchOptionOnlyLabel,
  } = toRefs(props);

  const _value = ref<CascaderModelValue>(
    props.defaultValue ?? getDefaultValue(props.multiple, props.pathMode),
  );
  const _inputValue = ref(props.defaultInputValue);
  const instance = getCurrentInstance();

  const { mergedDisabled, eventHandlers } = useFormItem({ disabled });
  const { mergedAllowSearch } = useAllowSearch(
    computed(() => props.allowSearch ?? props.multiple),
    {
      compatPropNames: ['filterable'],
      getCompatValue: () => props.filterable,
      getDefaultValue: () => props.multiple,
    },
  );
  const mergedAllowClearValue = computed(() => {
    const rawProps = instance?.vnode.props;
    const hasAllowClearProp =
      !!rawProps &&
      ['allowClear', 'allow-clear'].some((propName) => Object.hasOwn(rawProps, propName));

    if (hasAllowClearProp) {
      return props.allowClear;
    }

    return props.clearable ?? props.allowClear;
  });
  const { mergedAllowClear } = useAllowClear(mergedAllowClearValue, ['clearable']);
  const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
    popupVisible,
    defaultPopupVisible,
    show,
    defaultShow,
    emit: emit as unknown as (
      event: 'update:popupVisible' | 'popupVisibleChange' | 'update:show' | 'showChange',
      visible: boolean,
    ) => void,
  });

  const mergedTriggerProps = computed(() => props.triggerProps ?? {});

  watch([modelValue, valueProp], ([nextModelValue, nextValue]) => {
    const mergedValue = nextModelValue ?? nextValue;
    if (isUndefined(mergedValue) || isNull(mergedValue)) {
      _value.value = getDefaultValue(props.multiple, props.pathMode);
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
    },
  );

  const computedValueMap = computed(() => {
    const values = getValidValues(props.modelValue ?? props.value ?? _value.value, {
      multiple: props.multiple,
      pathMode: props.pathMode,
    });
    return new Map<string, CascaderSingleValue>(
      values.map((value) => [
        getValueKey(value, {
          valueKey: props.valueKey,
          leafOptionValueMap,
        }),
        value,
      ]),
    );
  });

  const computedInputValue = computed(() => props.inputValue ?? _inputValue.value);

  const resolvedVirtualListProps = computed(() => {
    return resolveDropdownVirtualListProps(
      props.virtualListProps,
      props.triggerProps,
      DEFAULT_CASCADER_VIRTUAL_ITEM_SIZE,
    );
  });

  const getFilteredStatus = (label: string) => {
    return label?.toLocaleLowerCase().includes(computedInputValue.value?.toLocaleLowerCase());
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

  const updateValue = (values: CascaderSingleValue[]) => {
    const value: CascaderModelValue = props.multiple ? values : (values[0] ?? '');
    if (values.length === 0) {
      setSelectedPath();
      setActiveKey();
    }

    _value.value = value;
    emit('update:modelValue', value);
    emit('update:value', value);
    emit('change', value);
    eventHandlers.value?.onChange?.();
  };

  watch([multiple, pathMode], () => {
    const values: CascaderSingleValue[] = [];
    computedValueMap.value.forEach((value, key) => {
      const option = leafOptionMap.get(key);
      if (option) {
        values.push(pathMode.value ? option.pathValue : option.value);
      }
    });
    updateValue(values);
  });

  const handleRemove = (key: string) => {
    if (props.multiple) {
      const option = leafOptionMap.get(key);
      if (option) {
        selectMultiple(option, false);
      } else {
        const values: CascaderSingleValue[] = [];
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
      const leafOptionInfos = props.checkStrictly ? [option] : getLeafOptionInfos(option);

      updateValue([
        ...computedValueMap.value.values(),
        ...leafOptionInfos
          .filter((item) => !computedValueMap.value.has(item.key))
          .map((item) => {
            return props.pathMode ? item.pathValue : item.value;
          }),
      ]);
    } else {
      const leafOptionKeys = props.checkStrictly ? [option.key] : getLeafOptionKeys(option);
      const values: CascaderSingleValue[] = [];
      computedValueMap.value.forEach((value, key) => {
        if (!leafOptionKeys.includes(key)) {
          values.push(value);
        }
      });
      updateValue(values);
    }

    handleInputValueChange('', 'optionChecked');
  };

  const handleClickOption = (option: CascaderOptionInfo, checked?: boolean) => {
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
        handlePopupVisibleChange(true);
      }

      _inputValue.value = value;
      emit('inputValueChange', value);

      if (mergedAllowSearch.value) {
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
      const newValues: CascaderSingleValue[] = [];
      computedValueMap.value.forEach((_value, key) => {
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
    () => Boolean(mergedAllowSearch.value) && computedInputValue.value.length > 0,
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
      separator: props.separator,
      slots,
      valueMap: computedValueMap,
    }),
  );

  const handleKeyDown = getKeyDownHandler(
    new Map([
      [
        KEYBOARD_KEY.ENTER,
        (_ev: Event) => {
          if (computedPopupVisible.value) {
            if (activeOption.value) {
              let checked: boolean;
              if (props.checkStrictly || activeOption.value.isLeaf) {
                checked = !computedValueMap.value.has(activeOption.value.key);
              } else {
                checked = !getCheckedStatus(activeOption.value, computedValueMap.value).checked;
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
        (_ev: Event) => {
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
    ]),
  );

  const selectViewValue = computed(() => {
    const result: Array<{
      value: string;
      label: string;
      closable: boolean;
      tagProps?: CascaderOption['tagProps'];
    }> = [];
    computedValueMap.value.forEach((value, key) => {
      const option = leafOptionMap.get(key);
      if (option) {
        result.push({
          value: key,
          label:
            props.formatLabel?.(option.path.map((item) => item.raw)) ??
            getOptionLabel(option, {
              showPath: props.showPath,
              separator: props.separator,
            }),
          closable: !option.disabled,
          tagProps: option.tagProps,
        });
      } else if (props.fallback) {
        let label: string;
        if (isFunction(props.fallback)) {
          label = props.fallback(value);
        } else if (isArray(value)) {
          label = props.showPath
            ? value.map((item) => String(item)).join(props.separator)
            : String(value[value.length - 1] ?? '');
        } else {
          label = String(value);
        }
        result.push({
          value: key,
          label,
          closable: true,
        });
      }
    });
    return result;
  });
</script>
