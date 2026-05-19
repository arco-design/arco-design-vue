<template>
  <base-cascader-panel
    :display-columns="displayColumns"
    :selected-path="selectedPath"
    :active-key="activeKey"
    :multiple="multiple"
    :total-level="totalLevel"
    :check-strictly="checkStrictly"
    @keydown="handleKeyDown"
  >
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </base-cascader-panel>
</template>

<script setup lang="ts">
  import { computed, provide, reactive, ref, toRefs, useSlots, watch } from 'vue';

  import type {
    CascaderModelValue,
    CascaderOption,
    CascaderOptionInfo,
    CascaderSingleValue,
  } from './interface';
  import type { CascaderPanelEmits, CascaderPanelProps } from './types';

  import { isNull, isUndefined } from '../_utils/is';
  import { KEYBOARD_KEY, getKeyDownHandler } from '../_utils/keyboard';
  import { BaseType } from '../_utils/types';
  import BaseCascaderPanel from './base-cascader-panel';
  import { cascaderInjectionKey } from './context';
  import { useSelectedPath } from './hooks/use-selected-path';
  import {
    getCheckedStatus,
    getLeafOptionInfos,
    getLeafOptionKeys,
    getOptionInfos,
    getValidValues,
    getValueKey,
  } from './utils';

  defineOptions({
    name: 'CascaderPanel',
  });

  const props = withDefaults(defineProps<CascaderPanelProps>(), {
    pathMode: false,
    multiple: false,
    options: () => [],
    expandTrigger: 'click',
    checkStrictly: false,
    valueKey: 'value',
    expandChild: false,
  });

  const emit = defineEmits<CascaderPanelEmits>();
  const slots = useSlots();

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
    modelValue,
    value: valueProp,
    valueKey,
    expandChild,
    expandTrigger,
    multiple,
    pathMode,
  } = toRefs(props);

  const _value = ref<CascaderModelValue>(
    props.defaultValue ?? getDefaultValue(props.multiple, props.pathMode),
  );

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
        lazyLoadOptions: _lazyLoadOptions,
        optionMap,
        leafOptionSet,
        leafOptionMap,
        leafOptionValueMap,
        totalLevel,
        checkStrictly,
        fieldNames: _fieldNames,
        valueKey,
      });
    },
    {
      immediate: true,
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

  const filteredLeafOptions = computed(() =>
    props.checkStrictly ? Array.from(optionMap.values()) : Array.from(leafOptionSet),
  );

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
  };

  const selectSingle = (option: CascaderOptionInfo) => {
    updateValue([props.pathMode ? option.pathValue : option.value]);
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
  };

  const handleClickOption = (option: CascaderOptionInfo, checked?: boolean) => {
    if (props.multiple) {
      selectMultiple(option, checked ?? true);
    } else {
      selectSingle(option);
    }
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
    expandChild,
  });

  provide(
    cascaderInjectionKey,
    reactive({
      onClickOption: handleClickOption,
      setActiveKey,
      setSelectedPath,
      loadMore,
      addLazyLoadOptions,
      slots,
      valueMap: computedValueMap,
      expandTrigger: expandTrigger.value,
    }),
  );

  const handleKeyDown = getKeyDownHandler(
    new Map([
      [
        KEYBOARD_KEY.ENTER,
        (_ev: Event) => {
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
          ev.preventDefault();
          if (activeOption.value?.children) {
            setSelectedPath(activeOption.value.key);
            setActiveKey(activeOption.value.children[0]?.key);
          }
        },
      ],
      [
        KEYBOARD_KEY.ARROW_LEFT,
        (ev: Event) => {
          ev.preventDefault();
          if (activeOption.value?.parent) {
            setSelectedPath(activeOption.value.parent.key);
            setActiveKey(activeOption.value.parent.key);
          }
        },
      ],
    ]),
  );
</script>
