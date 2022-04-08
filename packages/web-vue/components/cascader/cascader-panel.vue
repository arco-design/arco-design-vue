<template>
  <base-cascader-panel
    :display-columns="displayColumns"
    :selected-path="selectedPath"
    :active-key="activeKey"
    :computed-keys="computedKeys"
    :multiple="multiple"
    :expand-trigger="expandTrigger"
    :total-level="totalLevel"
    :check-strictly="checkStrictly"
  >
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </base-cascader-panel>
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
import { Data } from '../_utils/types';
import {
  CascaderFieldNames,
  CascaderOption,
  CascaderOptionInfo,
} from './interface';
import { isArray, isNull, isUndefined } from '../_utils/is';
import BaseCascaderPanel from './base-cascader-panel';
import { getKeysFromValue, getLeafOptionKeys, getOptionInfos } from './utils';
import { useSelectedPath } from './hooks/use-selected-path';
import { cascaderInjectionKey } from './context';
import { KEYBOARD_KEY, getKeyDownHandler } from '../_utils/keyboard';

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
      type: [String, Number, Array] as PropType<
        | string
        | number
        | Array<string | number>
        | undefined
        | (string | number | Array<string | number>)[]
      >,
    },
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     * @defaultValue '' \| undefined \| []
     */
    defaultValue: {
      type: [String, Number, Array] as PropType<
        | string
        | number
        | Array<string | number>
        | undefined
        | (string | number | Array<string | number>)[]
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
        (
          option: CascaderOptionInfo,
          done: (children?: CascaderOption[]) => void
        ) => void
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
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 选中值改变时触发
     * @en Triggered when the selected value changes
     * @property {string | string[] | undefined | (string | string[])[]} value
     */
    'change',
  ],
  /**
   * @zh 选项为空时的显示内容
   * @en Display content when the option is empty
   * @slot empty
   * @version 2.23.0
   */
  setup(props, { emit, slots }) {
    const { options, checkStrictly, loadMore, modelValue } = toRefs(props);
    const _value = ref(props.defaultValue);

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = props.multiple ? [] : undefined;
      }
    });

    const optionInfos = ref<CascaderOptionInfo[]>([]);
    const totalLevel = ref(1);

    const optionMap = reactive(new Map<string, CascaderOptionInfo>());
    const leafOptionMap = reactive(new Map<string, CascaderOptionInfo>());
    const leafOptionValueMap = reactive(
      new Map<string | number, CascaderOptionInfo>()
    );
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
          fieldNames: _fieldNames,
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

    const filteredLeafOptions = computed(() =>
      props.checkStrictly
        ? Array.from(optionMap.values())
        : Array.from(leafOptionSet)
    );

    const updateValue = (
      options?: CascaderOptionInfo | CascaderOptionInfo[]
    ) => {
      let value:
        | string
        | number
        | Array<string | number>
        | undefined
        | (string | number | Array<string | number>)[];
      if (!options) {
        if (!props.pathMode) {
          value = '';
        }
        setSelectedPath();
        setActiveKey();
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

    const selectSingle = (option: CascaderOptionInfo) => {
      updateValue(option);
    };

    const selectMultiple = (option: CascaderOptionInfo, checked: boolean) => {
      const leafOptionKeys = props.checkStrictly
        ? [option.key]
        : getLeafOptionKeys(option);

      const newKeys = checked
        ? computedKeys.value.concat(
            leafOptionKeys.filter((item) => !computedKeys.value.includes(item))
          )
        : computedKeys.value.filter((item) => !leafOptionKeys.includes(item));

      updateValue(
        newKeys.map((key) => leafOptionMap.get(key) as CascaderOptionInfo)
      );
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
      })
    );

    const handleKeyDown = getKeyDownHandler(
      new Map([
        [
          KEYBOARD_KEY.ENTER,
          (ev: Event) => {
            if (
              activeOption.value &&
              (activeOption.value.isLeaf || props.checkStrictly)
            ) {
              handleClickOption(activeOption.value);
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
      ])
    );

    return {
      optionInfos,
      computedKeys,
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
