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

<script lang="ts">
  import { computed, defineComponent, PropType, provide, reactive, ref, toRefs, watch } from 'vue';

  import { isNull, isUndefined } from '../_utils/is';
  import { KEYBOARD_KEY, getKeyDownHandler } from '../_utils/keyboard';
  import { BaseType } from '../_utils/types';
  import BaseCascaderPanel from './base-cascader-panel';
  import { cascaderInjectionKey } from './context';
  import { useSelectedPath } from './hooks/use-selected-path';
  import {
    CascaderFieldNames,
    CascaderModelValue,
    CascaderOption,
    CascaderOptionInfo,
    CascaderSingleValue,
  } from './interface';
  import {
    getCheckedStatus,
    getLeafOptionInfos,
    getLeafOptionKeys,
    getOptionInfos,
    getValidValues,
    getValueKey,
  } from './utils';

  const getDefaultValue = (multiple: boolean, pathMode: boolean): CascaderModelValue => {
    if (multiple) {
      return [];
    }

    if (pathMode) {
      return undefined;
    }

    return '';
  };

  export default defineComponent({
    name: 'CascaderPanel',
    components: {
      BaseCascaderPanel,
    },
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
        type: [String, Number, Object, Array] as PropType<CascaderModelValue>,
      },
      /**
       * @zh 绑定值，Naive 兼容别名
       * @en Value, Naive compatibility alias
       */
      value: {
        type: [String, Number, Object, Array] as PropType<CascaderModelValue>,
      },
      /**
       * @zh 默认值（非受控状态）
       * @en Default value (uncontrolled state)
       * @defaultValue '' \| undefined \| []
       */
      defaultValue: {
        type: [String, Number, Object, Array] as PropType<CascaderModelValue>,
        default: (props: { multiple?: boolean; pathMode?: boolean }) =>
          getDefaultValue(Boolean(props.multiple), Boolean(props.pathMode)),
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
       * @zh 展开下一级的触发方式
       * @en Expand the trigger method of the next level
       */
      expandTrigger: {
        type: String,
        default: 'click',
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
          (option: CascaderOption, done: (children?: CascaderOption[]) => void) => void
        >,
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
      'update:modelValue': (_value: CascaderModelValue) => true,
      'update:value': (_value: CascaderModelValue) => true,
      /**
       * @zh 选中值改变时触发
       * @en Triggered when the selected value changes
       * @property {string | number | (string | number | (string | number)[])[] | undefined} value
       */
      'change': (_value: CascaderModelValue) => true,
    },
    /**
     * @zh 选项为空时的显示内容
     * @en Display content when the option is empty
     * @slot empty
     * @version 2.23.0
     */
    setup(props, { emit, slots }) {
      const {
        options,
        checkStrictly,
        loadMore,
        modelValue,
        value: valueProp,
        valueKey,
        expandChild,
        expandTrigger,
      } = toRefs(props);
      const _value = ref<CascaderModelValue>(props.defaultValue);

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
          expandTrigger,
        }),
      );

      const handleKeyDown = getKeyDownHandler(
        new Map([
          [
            KEYBOARD_KEY.ENTER,
            (ev: Event) => {
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

      return {
        optionInfos,
        filteredLeafOptions,
        selectedPath,
        activeKey,
        displayColumns,
        handleKeyDown,
        totalLevel,
      };
    },
  });
</script>
