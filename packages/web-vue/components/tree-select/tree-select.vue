<template>
  <Trigger
    :class="`${prefixCls}-trigger`"
    auto-fit-popup-min-width
    trigger="click"
    position="bl"
    :popup-offset="4"
    animation-name="slide-dynamic-origin"
    :prevent-focus="true"
    v-bind="resolvedTriggerProps"
    :disabled="mergedDisabled"
    :popup-visible="panelVisible"
    :popup-container="popupContainer"
    :click-to-close="!Boolean(mergedAllowSearch)"
    auto-fit-transform-origin
    @popupVisibleChange="onVisibleChange"
  >
    <slot name="trigger">
      <SelectView
        ref="refSelectView"
        :model-value="selectViewValue"
        :input-value="searchValue"
        :allow-search="Boolean(mergedAllowSearch)"
        :allow-clear="mergedAllowClear"
        :show-arrow="showArrow"
        :loading="loading"
        :size="size"
        :max-tag-count="maxTagCount"
        :disabled="mergedDisabled"
        :opened="panelVisible"
        :error="error"
        :bordered="border"
        :placeholder="placeholder"
        :multiple="isMultiple"
        v-bind="$attrs"
        @inputValueChange="onSearchValueChange"
        @clear="onInnerClear"
        @remove="onItemRemove"
        @blur="onBlur"
      >
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix" />
        </template>
        <template v-if="$slots.label" #label="selectedData">
          <slot name="label" v-bind="selectedData" />
        </template>
        <template v-if="$slots.tag" #tag="selectedData">
          <slot name="tag" :data="selectedData?.data?.option ?? selectedData?.data" />
        </template>
      </SelectView>
    </slot>
    <template #content>
      <div
        :class="[
          `${prefixCls}-popup`,
          {
            [`${prefixCls}-has-header`]: Boolean($slots.header),
            [`${prefixCls}-has-footer`]: Boolean($slots.footer),
          },
          dropdownClassName,
        ]"
        :style="computedDropdownStyle"
      >
        <div v-if="$slots.header && (!isEmpty || showHeaderOnEmpty)" :class="`${prefixCls}-header`">
          <slot name="header" />
        </div>
        <slot v-if="loading" name="loader">
          <Spin />
        </slot>
        <slot v-else-if="isEmpty" name="empty">
          <component :is="TreeSelectEmpty ? TreeSelectEmpty : 'Empty'" />
        </slot>
        <Panel
          v-else
          :selected-keys="selectedKeys"
          :show-checkable="mergedTreeCheckable"
          :scrollbar="scrollbar"
          :tree-props="{
            actionOnNodeClick: selectable === 'leaf' ? 'expand' : undefined,
            blockNode: true,
            ...mergedTreeProps,
            data: mergedData,
            checkStrictly: treeCheckStrictly,
            checkedStrategy: mergedTreeCheckedStrategy,
            fieldNames,
            multiple,
            loadMore,
            filterTreeNode: computedFilterTreeNode,
            size,
            checkable: isCheckable,
            selectable: isSelectable,
            searchValue: searchValue,
          }"
          :tree-slots="pickSubCompSlots($slots, 'tree')"
          @change="onSelectChange"
        />
        <div v-if="$slots.footer && (!isEmpty || showFooterOnEmpty)" :class="`${prefixCls}-footer`">
          <slot name="footer" />
        </div>
      </div>
    </template>
  </Trigger>
</template>
<script lang="ts">
  import {
    computed,
    CSSProperties,
    defineComponent,
    DefineComponent,
    nextTick,
    PropType,
    reactive,
    ref,
    toRefs,
    StyleValue,
    inject,
  } from 'vue';

  import { SelectViewValue } from '../_components/select-view/interface';
  import SelectView from '../_components/select-view/select-view';
  import { VirtualListProps } from '../_components/virtual-list/interface';
  import { useAllowClear } from '../_hooks/use-allow-clear';
  import { useAllowSearch } from '../_hooks/use-allow-search';
  import { useFormItem } from '../_hooks/use-form-item';
  import useMergeState from '../_hooks/use-merge-state';
  import { Size } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';
  import { isUndefined, isFunction, isObject } from '../_utils/is';
  import pickSubCompSlots from '../_utils/pick-sub-comp-slots';
  import { Data } from '../_utils/types';
  import { resolveDropdownVirtualListProps } from '../_utils/virtual-dropdown';
  import { configProviderInjectionKey } from '../config-provider/context';
  import Empty from '../empty';
  import { ScrollbarProps } from '../scrollbar';
  import Spin from '../spin';
  import useTreeData from '../tree/hooks/use-tree-data';
  import { TreeFieldNames, TreeNodeData, TreeProps, TreeNodeKey, Node } from '../tree/interface';
  import { isNodeSelectable } from '../tree/utils';
  import { getCheckedStateByCheck, isNodeCheckable } from '../tree/utils/check-utils';
  import Trigger, { TriggerProps } from '../trigger';
  import useFilterTreeNode from './hooks/use-filter-tree-node';
  import useSelectedState from './hooks/use-selected-state';
  import { LabelValue, TreeSelectValue } from './interface';
  import Panel from './panel';

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
        default: true,
      },
      /**
       * @zh 是否允许搜索
       * @en Whether to allow searching
       * @defaultValue false (single) \| true (multiple)
       * */
      allowSearch: {
        type: [Boolean, Object] as PropType<boolean | { retainInputValue?: boolean }>,
        default: undefined,
      },
      /**
       * @zh 是否允许搜索，Naive 兼容别名
       * @en Whether to allow searching, Naive compatibility alias
       * */
      filterable: {
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
       * @zh 是否允许清除，Naive 兼容别名
       * @en Whether to allow clear, Naive compatibility alias
       * */
      clearable: {
        type: Boolean,
      },
      showArrow: {
        type: Boolean,
        default: true,
      },
      /**
       * @zh 提示文案
       * @en Prompt copy
       * */
      placeholder: {
        type: String,
      },
      /**
       * @zh 最多显示的标签数量，仅在多选模式有效
       * @en The maximum number of labels displayed, only valid in multi-select mode
       * */
      maxTagCount: {
        type: [Number, String] as PropType<number | 'responsive'>,
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
        type: [String, Number, Array, Object] as PropType<TreeSelectValue>,
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
       * @zh 绑定值，Naive 兼容别名
       * @en Value, Naive compatibility alias
       * */
      value: {
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
       * @zh 数据，Naive 兼容别名
       * @en Data, Naive compatibility alias
       * */
      options: {
        type: Array as PropType<TreeNodeData[]>,
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
       * @zh 是否展示复选框，Naive 兼容别名
       * @en Whether to show checkbox, Naive compatibility alias
       * */
      checkable: {
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
       * @zh 定制回显方式，Naive 兼容别名
       * @en Customized echo method, Naive compatibility alias
       * */
      checkStrategy: {
        type: String as PropType<'all' | 'parent' | 'child'>,
      },
      /**
       * @zh 是否展示完整路径
       * @en Whether to display the full path
       * */
      showPath: {
        type: Boolean,
      },
      /**
       * @zh 路径分隔符
       * @en Path separator
       * */
      separator: {
        type: String,
        default: ' / ',
      },
      /**
       * @zh 可以接受所有 [Tree](/vue/component/tree) 组件的Props
       * @en Can accept Props of all [Tree](/vue/component/tree) components
       * */
      treeProps: {
        type: Object as PropType<Partial<TreeProps>>,
      },
      /**
       * @zh 传递树虚拟列表属性，传入此参数以开启虚拟滚动
       * @en Pass tree virtual list properties to enable virtual scrolling
       */
      virtualListProps: {
        type: Object as PropType<VirtualListProps>,
      },
      /**
       * @zh 可以接受所有 [Trigger](/vue/component/trigger) 组件的Props
       * @en Can accept Props of all [Trigger](/vue/component/trigger) components
       * */
      triggerProps: {
        type: Object as PropType<Partial<TriggerProps>>,
      },
      /**
       * @zh 是否开启虚拟滚动，Naive 兼容别名
       * @en Whether to enable virtual scroll, Naive compatibility alias
       * */
      virtualScroll: {
        type: Boolean,
        default: undefined,
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
      show: {
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
      defaultShow: {
        type: Boolean,
        default: undefined,
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
        type: Function as PropType<(searchKey: string, nodeData: TreeNodeData) => boolean>,
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
        type: [String, Object] as PropType<string | HTMLElement>,
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
      /**
       * @zh 设置可选择的节点，默认全部可选
       * @en Set the nodes that can be selected, all can be selected by default
       * @version 2.27.0
       */
      selectable: {
        type: [Boolean, String, Function] as PropType<
          | boolean
          | 'leaf'
          | ((node: TreeNodeData, info: { isLeaf: boolean; level: number }) => boolean)
        >,
        default: true,
      },
      /**
       * @zh 是否开启虚拟滚动条
       * @en Whether to enable virtual scroll bar
       * @version 2.39.0
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
      /**
       * @zh 输入框的值
       * @en The value of the input
       * @vModel
       * @version 2.55.0
       */
      inputValue: {
        type: String,
      },
      /**
       * @zh 输入框的默认值（非受控模式）
       * @en The default value of the input (uncontrolled mode)
       * @version 2.55.0
       */
      defaultInputValue: {
        type: String,
        default: '',
      },
    },
    emits: {
      /**
       * @zh 值改变时触发
       * @en Trigger when the value changes
       * @param {string | number | LabelValue | Array<string | number> | LabelValue[] | undefined} value
       */
      'change': (_value: TreeSelectValue | undefined) => true,
      'update:modelValue': (_value: TreeSelectValue | undefined) => true,
      'update:value': (_value: TreeSelectValue | undefined) => true,
      'update:inputValue': (_inputValue: string) => true,
      /**
       * @zh 下拉框显示状态改变时触发
       * @en Triggered when the status of the drop-down box changes
       * @param {boolean} visible
       */
      'popup-visible-change': (_visible: boolean) => true,
      'update:popupVisible': (_visible: boolean) => true,
      'showChange': (_visible: boolean) => true,
      'update:show': (_visible: boolean) => true,
      /**
       * @zh 搜索值变化时触发
       * @en Triggered when the search value changes
       * @param {string} searchKey
       */
      'search': (_searchKey: string) => true,
      /**
       * @zh 点击清除时触发
       * @en Triggered when clear is clicked
       * */
      'clear': () => true,
      /**
       * @zh 输入框的值发生改变时触发
       * @en Triggered when the value of the input changes
       * @param {string} inputValue
       * @version 2.55.0
       */
      'inputValueChange': (_inputValue: string) => true,
    },
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
    /**
     * @zh 定制 tree 组件的 switcher 图标
     * @en Custom switcher icon for the tree component
     * @slot tree-slot-switcher-icon
     */
    /**
     * @zh 定制 tree 组件的节点图标
     * @en Custom node icon for the tree component
     * @slot tree-slot-icon
     * @binding {TreeNodeData} node
     * @version 2.18.0
     */

    /**
     * @zh 定制 tree 组件的节点标题
     * @en Custom the node title of the tree component
     * @slot tree-slot-title
     * @binding {string} title
     */
    /**
     * @zh 定制 tree 组件的渲染额外节点内容
     * @en Render additional node content of the tree component
     * @slot tree-slot-extra
     */
    /**
     * @zh 自定义下拉框页头
     * @en The header of the drop-down box
     * @slot header
     */
    /**
     * @zh 自定义下拉框页脚
     * @en The footer of the drop-down box
     * @slot footer
     */
    setup(props, { emit, slots }) {
      const {
        defaultValue,
        modelValue,
        multiple,
        popupVisible,
        show,
        defaultPopupVisible,
        defaultShow,
        treeCheckable,
        treeCheckStrictly,
        data,
        options,
        fieldNames,
        disabled,
        labelInValue,
        filterTreeNode,
        disableFilter,
        dropdownStyle,
        treeProps,
        fallbackOption,
        selectable,
        checkable,
        checkStrategy,
        showPath,
        separator,
        value,
        virtualScroll,
      } = toRefs(props);
      const { mergedDisabled, eventHandlers } = useFormItem({
        disabled,
      });
      const prefixCls = getPrefixCls('tree-select');
      const configCtx = inject(configProviderInjectionKey, undefined);
      const { mergedAllowSearch } = useAllowSearch(
        computed(() => props.allowSearch),
        {
          compatPropNames: ['filterable'],
          getCompatValue: () => props.filterable,
          getDefaultValue: () => Boolean(props.multiple || props.treeCheckable || props.checkable),
        },
      );
      const { mergedAllowClear } = useAllowClear(
        computed(() => props.allowClear || props.clearable),
      );
      const TreeSelectEmpty = configCtx?.slots.empty?.({
        component: 'tree-select',
      })?.[0];
      const mergedModelValue = computed(() => value.value ?? modelValue.value);
      const mergedData = computed(() => options.value ?? data.value);
      const mergedTreeCheckable = computed(() => treeCheckable.value || checkable.value);
      const mergedTreeCheckedStrategy = computed(
        () => checkStrategy.value ?? props.treeCheckedStrategy,
      );
      const mergedTreeProps = computed(() => {
        const resolvedVirtualListProps = resolveDropdownVirtualListProps(
          props.virtualListProps ?? treeProps.value?.virtualListProps,
          props.triggerProps,
        );

        if (virtualScroll.value !== false) {
          return {
            ...treeProps.value,
            ...(resolvedVirtualListProps ? { virtualListProps: resolvedVirtualListProps } : {}),
          };
        }

        const nextTreeProps = {
          ...treeProps.value,
        };

        delete nextTreeProps.virtualListProps;
        return nextTreeProps;
      });
      const isMultiple = computed(() => multiple.value || mergedTreeCheckable.value);
      const isSelectable = (node: TreeNodeData, info: { level: number; isLeaf: boolean }) => {
        if (selectable.value === 'leaf') return info.isLeaf;
        if (isFunction(selectable.value)) return selectable.value(node, info);
        return selectable.value ?? false;
      };
      const isCheckable = computed(() => (mergedTreeCheckable.value ? isSelectable : false));
      const retainInputValue = computed(
        () =>
          isObject(mergedAllowSearch.value) && Boolean(mergedAllowSearch.value.retainInputValue),
      );
      const { flattenTreeData, key2TreeNode } = useTreeData(
        reactive({
          treeData: mergedData,
          fieldNames,
          selectable: isSelectable,
          checkable: isCheckable,
        }),
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
          modelValue: mergedModelValue,
          key2TreeNode,
          multiple,
          treeCheckable: mergedTreeCheckable,
          treeCheckStrictly,
          fallbackOption,
          fieldNames,
          showPath,
          separator,
        }),
      );

      function isNodeClosable(node: Node) {
        return mergedTreeCheckable.value ? isNodeCheckable(node) : isNodeSelectable(node);
      }

      const selectViewValue = computed(() => {
        if (isUndefined(selectedValue.value)) {
          return [];
        }
        if (isMultiple.value && !mergedDisabled.value) {
          return selectedValue.value.map((i) => {
            const node = key2TreeNode.value.get(i.value);
            return {
              ...i,
              option: node?.treeNodeData,
              closable: !node || isNodeClosable(node),
            };
          }) as SelectViewValue[];
        }
        return selectedValue.value.map((i) => {
          const node = key2TreeNode.value.get(i.value);
          return {
            ...i,
            option: node?.treeNodeData,
          };
        }) as SelectViewValue[];
      });

      const setSelectedKeys = (newVal: TreeNodeKey[]) => {
        setLocalSelectedKeys(newVal);

        nextTick(() => {
          const forEmitValue =
            (labelInValue.value ? localSelectedValue.value : localSelectedKeys.value) || [];

          const emitValue = isMultiple.value ? forEmitValue : forEmitValue[0];

          emit('update:modelValue', emitValue);
          emit('update:value', emitValue);
          emit('change', emitValue);
          eventHandlers.value?.onChange?.();
        });
      };

      const _inputValue = ref(props.defaultInputValue);
      const computedInputValue = computed(() => props.inputValue ?? _inputValue.value);

      const updateInputValue = (inputValue: string) => {
        _inputValue.value = inputValue;
        emit('update:inputValue', inputValue);
        emit('inputValueChange', inputValue);
      };

      const handleInputValueChange = (inputValue: string) => {
        if (inputValue !== computedInputValue.value) {
          setPanelVisible(true);
          updateInputValue(inputValue);
          if (mergedAllowSearch.value) {
            emit('search', inputValue);
          }
        }
      };

      const [panelVisible, setLocalPanelVisible] = useMergeState(
        defaultPopupVisible.value ?? defaultShow.value,
        reactive({
          value: computed(() => popupVisible.value ?? show.value),
        }),
      );
      const setPanelVisible = (visible: boolean) => {
        if (visible !== panelVisible.value) {
          setLocalPanelVisible(visible);
          emit('popup-visible-change', visible);
          emit('update:popupVisible', visible);
          emit('showChange', visible);
          emit('update:show', visible);
        }

        if (!visible) {
          refSelectView.value && refSelectView.value.blur && refSelectView.value.blur();
        }
      };

      const { isEmptyFilterResult, filterTreeNode: computedFilterTreeNode } = useFilterTreeNode(
        reactive({
          searchValue: computedInputValue,
          flattenTreeData,
          filterMethod: filterTreeNode,
          disableFilter,
          fieldNames,
        }),
      );

      const isEmpty = computed(() => !flattenTreeData.value.length || isEmptyFilterResult.value);

      const refSelectView = ref();

      const computedDropdownStyle = computed<StyleValue[]>(() => [
        dropdownStyle?.value || {},
        mergedTreeProps.value.virtualListProps ? { 'max-height': 'unset' } : {},
      ]);

      const resolvedTriggerProps = computed<Partial<TriggerProps> | undefined>(() => {
        if (!props.triggerProps) {
          return undefined;
        }

        const nextTriggerProps: Partial<TriggerProps> = {
          ...props.triggerProps,
        };

        if (!mergedTreeProps.value.virtualListProps) {
          return nextTriggerProps;
        }

        const popupStyle = {
          ...props.triggerProps.popupStyle,
        };

        delete popupStyle.maxHeight;
        delete popupStyle.height;

        if (Object.keys(popupStyle).length > 0) {
          nextTriggerProps.popupStyle = popupStyle;
        } else {
          delete nextTriggerProps.popupStyle;
        }

        return nextTriggerProps;
      });

      const onBlur = () => {
        if (!retainInputValue.value && computedInputValue.value) {
          updateInputValue('');
        }
      };

      return {
        refSelectView,
        prefixCls,
        TreeSelectEmpty,
        selectedValue,
        selectedKeys,
        mergedDisabled,
        mergedData,
        searchValue: computedInputValue,
        panelVisible,
        isEmpty,
        computedFilterTreeNode,
        isMultiple,
        mergedAllowSearch,
        mergedAllowClear,
        mergedTreeCheckable,
        mergedTreeCheckedStrategy,
        mergedTreeProps,
        resolvedTriggerProps,
        selectViewValue,
        computedDropdownStyle,
        onSearchValueChange: handleInputValueChange,
        onSelectChange(newVal: string[]) {
          setSelectedKeys(newVal);
          if (!retainInputValue.value && computedInputValue.value) {
            updateInputValue('');
          }

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
        isSelectable,
        isCheckable,
        onBlur,
        onItemRemove(id: string) {
          if (mergedDisabled.value) return;
          const node = key2TreeNode.value.get(id);
          if (mergedTreeCheckable.value && node) {
            if (isNodeClosable(node)) {
              const [newVal] = getCheckedStateByCheck({
                node,
                checked: false,
                checkedKeys: selectedKeys.value,
                indeterminateKeys: [],
                checkStrictly: treeCheckStrictly.value,
              });
              setSelectedKeys(newVal);
            }
          } else {
            const newVal = selectedKeys.value.filter((i) => i !== id);
            setSelectedKeys(newVal);
          }
        },
      };
    },
  });
</script>
