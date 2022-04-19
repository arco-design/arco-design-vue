<template>
  <Trigger
    :class="`${prefixCls}-trigger`"
    auto-fit-popup-min-width
    trigger="click"
    position="bl"
    :popup-offset="4"
    animation-name="slide-dynamic-origin"
    :prevent-focus="true"
    v-bind="triggerProps"
    :disabled="mergedDisabled"
    :popup-visible="panelVisible"
    :popup-container="popupContainer"
    auto-fit-transform-origin
    @popupVisibleChange="onVisibleChange"
  >
    <slot name="trigger">
      <SelectView
        ref="refSelectView"
        :model-value="selectViewValue"
        :input-value="searchValue"
        :allow-search="allowSearch"
        :allow-clear="allowClear"
        :loading="loading"
        :size="size"
        :max-tag-count="maxTagCount"
        :disabled="mergedDisabled"
        :opened="panelVisible"
        :error="error"
        :border="border"
        :placeholder="placeholder"
        :multiple="isMultiple"
        v-bind="$attrs"
        @inputValueChange="onSearchValueChange"
        @clear="onInnerClear"
      >
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix" />
        </template>
        <template v-if="$slots.label" #label="selectedData">
          <slot name="label" v-bind="selectedData" />
        </template>
      </SelectView>
    </slot>
    <template #content>
      <div
        :class="[`${prefixCls}-popup`, dropdownClassName]"
        :style="computedDropdownStyle"
      >
        <slot v-if="loading" name="loader">
          <Spin />
        </slot>
        <slot v-else-if="isEmptyTreeData || isEmptyFilterResult" name="empty">
          <Empty />
        </slot>
        <Panel
          v-else
          :selected-keys="selectedKeys"
          :checkable="treeCheckable"
          :tree-props="{
            blockNode: true,
            ...treeProps,
            data,
            checkStrictly: treeCheckStrictly,
            checkedStrategy: treeCheckedStrategy,
            fieldNames,
            multiple,
            loadMore,
            filterTreeNode: computedFilterTreeNode,
            size,
          }"
          :tree-slots="pickSubCompSlots($slots, 'tree')"
          @change="onSelectChange"
        />
      </div>
    </template>
  </Trigger>
</template>
<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
  toRefs,
  StyleValue,
  inject,
} from 'vue';
import useMergeState from '../_hooks/use-merge-state';
import { LabelValue, TreeSelectProps } from './interface';
import Trigger from '../trigger';
import SelectView from '../_components/select-view/select-view';
import Panel from './panel';
import { getPrefixCls } from '../_utils/global-config';
import useSelectedState from './hooks/use-selected-state';
import useTreeData from '../tree/hooks/use-tree-data';
import { TreeFieldNames, TreeNodeData, TreeProps } from '../tree/interface';
import { isArray, isEmptyObject, isUndefined } from '../_utils/is';
import Empty from '../empty';
import useFilterTreeNode from './hooks/use-filter-tree-node';
import Spin from '../spin';
import pickSubCompSlots from '../_utils/pick-sub-comp-slots';
import { Size } from '../_utils/constant';
import { useFormItem } from '../_hooks/use-form-item';

const isEmpty = (val: any) => {
  return !val || (isArray(val) && val.length === 0) || isEmptyObject(val);
};

export default defineComponent({
  name: 'TreeSelect',
  components: {
    Trigger,
    SelectView,
    Panel,
    Empty,
    Spin,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 是否禁用
     * @en Whether to disable
     * */
    disabled: {
      type: Boolean,
    },
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     * */
    loading: {
      type: Boolean,
    },
    /**
     * @zh 是否为错误状态
     * @en Whether it is an error state
     * */
    error: {
      type: Boolean,
    },
    /**
     * @zh 选择框的大小
     * @en The size of the selection box.
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     * */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 是否显示边框
     * @en Whether to show the border
     * */
    border: {
      type: Boolean,
    },
    /**
     * @zh 是否允许搜索
     * @en Whether to allow searching
     * */
    allowSearch: {
      type: Boolean,
    },
    /**
     * @zh 是否允许清除
     * @en Whether to allow clear
     * */
    allowClear: {
      type: Boolean,
    },
    /**
     * @zh 提示文案
     * @en Prompt copy
     * */
    placeholder: {
      type: String,
    },
    /**
     * @zh 是否在搜索框聚焦时保留现有内容
     * @en Whether to keep existing content when the search box is focused
     * */
    retainInputValue: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 最多显示的标签数量，仅在多选模式有效
     * @en The maximum number of labels displayed, only valid in multi-select mode
     * */
    maxTagCount: {
      type: Number,
    },
    /**
     * @zh 是否支持多选
     * @en Whether to support multiple selection
     * */
    multiple: {
      type: Boolean,
    },

    /**
     * @zh 默认值
     * @en Default value
     * */
    defaultValue: {
      type: [String, Number, Array, Object] as PropType<
        string | number | Array<string | number> | LabelValue | LabelValue[]
      >,
    },
    /**
     * @zh 绑定值
     * @en Value
     * */
    modelValue: {
      type: [String, Number, Array, Object] as PropType<
        string | number | Array<string | number> | LabelValue | LabelValue[]
      >,
    },
    /**
     * @zh 指定节点数据中的字段名
     * @en Specify the field name in the node data
     * */
    fieldNames: {
      type: Object as PropType<TreeFieldNames>,
    },
    /**
     * @zh 数据
     * @en Data
     * */
    data: {
      type: Array as PropType<TreeNodeData[]>,
      default: () => [],
    },
    /**
     * @zh 设置value格式。默认是string，设置为true时候，value格式为： { label: string, value: string }
     * @en Set the value format. The default is string, when set to true, the value format is: {label: string, value: string}
     * */
    labelInValue: {
      type: Boolean,
    },
    /**
     * @zh 是否展示复选框
     * @en Whether to show checkbox
     * */
    treeCheckable: {
      type: Boolean,
    },
    /**
     * @zh 父子节点是否关联
     * @en Whether the parent and child nodes are related
     * */
    treeCheckStrictly: {
      type: Boolean,
    },
    /**
     * @zh 定制回显方式
     * @en Customized echo method
     * */
    treeCheckedStrategy: {
      type: String as PropType<'all' | 'parent' | 'child'>,
      default: 'all',
    },
    /**
     * @zh 可以接受所有 [Tree](/vue/component/tree) 组件的Props
     * @en Can accept Props of all [Tree](/vue/component/tree) components
     * */
    treeProps: {
      type: Object as PropType<Partial<TreeProps>>,
    },
    /**
     * @zh 可以接受所有 [Trigger](/vue/component/trigger) 组件的Props
     * @en Can accept Props of all [Trigger](/vue/component/trigger) components
     * */
    triggerProps: {
      type: Object as PropType<Record<string, unknown>>,
    },
    /**
     * @zh 弹出框是否可见
     * @en Whether the pop-up box is visible
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认弹出框是否可见
     * @en Whether the default pop-up box is visible
     * */
    defaultPopupVisible: {
      type: Boolean,
    },
    /**
     * @zh 下拉框样式
     * @en Drop-down box style
     * */
    dropdownStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 下拉框样式 class
     * @en Drop-down box style class
     * */
    dropdownClassName: {
      type: [String, Array] as PropType<string | string[]>,
    },
    /**
     * @zh 自定义节点过滤函数
     * @en Custom node filter function
     * */
    filterTreeNode: {
      type: Function as PropType<
        (searchKey: string, nodeData: TreeNodeData) => boolean
      >,
    },
    /**
     * @zh 动态加载数据
     * @en Load data dynamically
     * */
    loadMore: {
      type: Function as PropType<(nodeData: TreeNodeData) => Promise<void>>,
    },
    /**
     * @zh 禁用内部过滤逻辑
     * @en Disable internal filtering logic
     * */
    disableFilter: {
      type: Boolean,
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for pop-up box
     */
    popupContainer: {
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
    },
    /**
     * @zh 为 value 中找不到匹配项的 key 定义节点数据
     * @en Customize node data for keys that do not match options
     * @version 2.22.0
     */
    fallbackOption: {
      type: [Boolean, Function] as PropType<
        boolean | ((key: number | string) => TreeNodeData | boolean)
      >,
      default: true,
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<TreeSelectProps['onChange']>,
    },
    onPopupVisibleChange: {
      type: [Function, Array] as PropType<
        TreeSelectProps['onPopupVisibleChange']
      >,
    },
    onSearch: {
      type: [Function, Array] as PropType<TreeSelectProps['onSearch']>,
    },
    onClear: {
      type: [Function, Array] as PropType<TreeSelectProps['onClear']>,
    },
  },
  emits: [
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @param {string | number | LabelValue | Array<string | number> | LabelValue[] | undefined} selectedValue
     */
    'change',
    'update:modelValue',
    /**
     * @zh 下拉框显示状态改变时触发
     * @en Triggered when the status of the drop-down box changes
     * @param {boolean} popupVisible
     */
    'popup-visible-change',
    'update:popupVisible',
    /**
     * @zh 搜索值变化时触发
     * @en Triggered when the search value changes
     * @param {string} searchKey
     */
    'search',
    /**
     * @zh 点击清除时触发
     * @en Triggered when clear is clicked
     * */
    'clear',
  ],
  /**
   * @zh 自定义触发元素
   * @en Custom trigger element
   * @slot trigger
   */
  /**
   * @zh 前缀
   * @en Prefix
   * @slot prefix
   */
  /**
   * @zh 自定义选择框显示
   * @en Custom Label
   * @slot label
   * @binding data
   */
  /**
   * @zh 定制加载中显示的内容
   * @en Customizing the content displayed during loading
   * @slot loader
   */
  /**
   * @zh 定制空数据展示
   * @en Custom empty data display
   * @slot empty
   */
  setup(props: TreeSelectProps, { emit }) {
    const {
      defaultValue,
      modelValue,
      multiple,
      popupVisible,
      defaultPopupVisible,
      treeCheckable,
      treeCheckStrictly,
      data,
      fieldNames,
      disabled,
      labelInValue,
      filterTreeNode,
      disableFilter,
      dropdownStyle,
      treeProps,
      fallbackOption,
    } = toRefs(props);
    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled,
    });

    const prefixCls = getPrefixCls('tree-select');

    const isMultiple = computed(() => multiple.value || treeCheckable.value);

    const { flattenTreeData, key2TreeNode } = useTreeData(
      reactive({
        treeData: data,
        fieldNames,
        selectable: true,
        checkable: treeCheckable,
      })
    );

    const {
      selectedKeys,
      selectedValue,
      setLocalSelectedKeys,
      localSelectedKeys,
      localSelectedValue,
    } = useSelectedState(
      reactive({
        defaultValue,
        modelValue,
        key2TreeNode,
        multiple,
        treeCheckable,
        treeCheckStrictly,
        fallbackOption,
        fieldNames,
      })
    );

    const selectViewValue = computed(() => {
      if (isUndefined(selectedValue.value)) {
        return [];
      }
      return selectedValue.value;
    });

    const setSelectedKeys = (newVal: string[]) => {
      setLocalSelectedKeys(newVal);

      nextTick(() => {
        const forEmitValue =
          (labelInValue.value
            ? localSelectedValue.value
            : localSelectedKeys.value) || [];

        const emitValue = isMultiple.value ? forEmitValue : forEmitValue[0];

        emit('update:modelValue', emitValue);
        emit('change', emitValue);
        eventHandlers.value?.onChange?.();
      });
    };

    const searchValue = ref('');

    const [panelVisible, setLocalPanelVisible] = useMergeState(
      defaultPopupVisible.value,
      reactive({
        value: popupVisible,
      })
    );
    const setPanelVisible = (visible: boolean) => {
      if (visible !== panelVisible.value) {
        setLocalPanelVisible(visible);
        emit('popup-visible-change', visible);
        emit('update:popupVisible', visible);
      }

      if (!visible) {
        refSelectView.value &&
          refSelectView.value.blur &&
          refSelectView.value.blur();
      }
    };

    const { isEmptyFilterResult, filterTreeNode: computedFilterTreeNode } =
      useFilterTreeNode(
        reactive({
          searchValue,
          flattenTreeData,
          filterMethod: filterTreeNode,
          disableFilter,
          fieldNames,
        })
      );

    const isEmptyTreeData = computed(() => isEmpty(key2TreeNode.value));

    const refSelectView = ref();

    const computedDropdownStyle = computed<StyleValue[]>(() => [
      dropdownStyle?.value || {},
      treeProps?.value?.virtualListProps ? { 'max-height': 'unset' } : {},
    ]);

    return {
      refSelectView,
      prefixCls,
      selectedValue,
      selectedKeys,
      mergedDisabled,
      searchValue,
      panelVisible,
      isEmptyTreeData,
      isEmptyFilterResult,
      computedFilterTreeNode,
      isMultiple,
      selectViewValue,
      computedDropdownStyle,
      onSearchValueChange(newVal: string) {
        setPanelVisible(true);
        searchValue.value = newVal;
        emit('search', newVal);
      },
      onSelectChange(newVal: string[]) {
        setSelectedKeys(newVal);
        searchValue.value = '';

        if (!isMultiple.value) {
          setPanelVisible(false);
        }
      },
      onVisibleChange: setPanelVisible,
      onInnerClear() {
        setSelectedKeys([]);
        emit('clear');
      },
      pickSubCompSlots,
    };
  },
});
</script>
