<template>
  <div :class="classNames">
    <VirtualList
      v-if="virtualListProps"
      ref="virtualListRef"
      v-bind="virtualListProps"
      :data="visibleTreeNodeList"
    >
      <template #item="{ item: node }">
        <TreeNode :key="node.key" v-bind="node.treeNodeProps" />
      </template>
    </VirtualList>
    <template v-else>
      <TreeNode
        v-for="node in visibleTreeNodeList"
        :key="node.key"
        v-bind="node.treeNodeProps"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  provide,
  reactive,
  PropType,
  toRefs,
  ref,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { TreeInjectionKey } from './context';
import usePickSlots from '../_hooks/use-pick-slots';
import {
  FieldNames,
  TreeNodeData,
  TreeProps,
  FilterTreeNode,
  DropPosition,
  TreeNodeKey,
} from './interface';
import { getCheckedStateByCheck, isNodeCheckable } from './utils';
import TreeNode from './node';
import { isFunction, isUndefined } from '../_utils/is';
import useMergeState from '../_hooks/use-merge-state';
import useCheckedState from './hooks/use-checked-state';
import useTreeData from './hooks/use-tree-data';
import VirtualList from '../_components/virtual-list/virtual-list.vue';
import {
  VirtualListProps,
  ScrollIntoViewOptions,
} from '../_components/virtual-list/interface';

export default defineComponent({
  name: 'Tree',
  components: {
    VirtualList,
    TreeNode,
  },
  props: {
    /**
     * @zh 尺寸
     * @en Size
     */
    size: {
      type: String as PropType<'mini' | 'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    /**
     * @zh 节点是否占据一行
     * @en Whether the node occupies a row
     */
    blockNode: {
      type: Boolean,
    },
    /**
     * @zh 是否默认展开父节点
     * @en Whether to expand the parent node by default
     */
    defaultExpandAll: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否支持多选
     * @en Whether to support multiple selection
     */
    multiple: {
      type: Boolean,
    },
    /**
     * @zh 是否在节点前添加复选框
     * @en Whether to add a checkbox before the node
     */
    checkable: {
      type: Boolean,
    },
    /**
     * @zh 是否支持选择
     * @en Whether to support selection
     * */
    selectable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否取消父子节点关联
     * @en Whether to cancel the parent-child node association
     * */
    checkStrictly: {
      type: Boolean,
    },
    /**
     * @zh 定制回填方式 <br/> all: 返回所有选中的节点  <br/> parent: 父子节点都选中时只返回父节点 <br/> child: 只返回子节点
     * @en Customized backfill method <br/> all: return all selected nodes <br/> parent: return only parent node when both parent and child nodes are selected <br/> child: return only child nodes
     * */
    checkedStrategy: {
      type: String as PropType<'all' | 'parent' | 'child'>,
      default: 'all',
    },
    /**
     * @zh 默认选中的树节点
     * @en Tree node selected by default
     * */
    defaultSelectedKeys: {
      type: Array as PropType<Array<string | number>>,
    },
    /**
     * @zh 选中的树节点
     * @en Selected tree node
     * @vModel
     */
    selectedKeys: {
      type: Array as PropType<Array<string | number>>,
    },
    /**
     * @zh 默认选中复选框的树节点
     * @en Tree node with checkbox selected by default
     * */
    defaultCheckedKeys: {
      type: Array as PropType<Array<string | number>>,
    },
    /**
     * @zh 选中复选框的树节点
     * @en Tree node with check box selected
     * @vModel
     */
    checkedKeys: {
      type: Array as PropType<Array<string | number>>,
    },
    /**
     * @zh 默认展开的节点
     * @en Nodes expanded by default
     * */
    defaultExpandedKeys: {
      type: Array as PropType<Array<string | number>>,
    },
    /**
     * @zh 展开的节点
     * @en Expanded node
     * @vModel
     */
    expandedKeys: {
      type: Array as PropType<Array<string | number>>,
    },
    /**
     * @zh 传入`data`,生成对应的树结构
     * @en Pass in `data` to generate the corresponding tree structure
     * */
    data: {
      type: Array as PropType<TreeNodeData[]>,
      default: () => [],
    },
    /**
     * @zh 指定节点数据中的字段名
     * @en Specify the field name in the node data
     * */
    fieldNames: {
      type: Object as PropType<FieldNames>,
    },
    /**
     * @zh 是否展示连接线
     * @en Whether to display the connection line
     * */
    showLine: {
      type: Boolean,
    },
    /**
     * @zh 异步加载数据的回调，返回一个 `Promise`
     * @en A callback for loading data asynchronously, returning a `Promise`
     * */
    loadMore: {
      type: Function as PropType<(node: TreeNodeData) => Promise<void>>,
    },
    /**
     * @zh 是否可以拖拽
     * @en Whether it can be dragged
     * */
    draggable: {
      type: Boolean,
    },
    /**
     * @zh 拖拽时是否允许在某节点上释放
     * @en Whether to allow release on a node when dragging
     * */
    allowDrop: {
      type: Function as PropType<
        (options: {
          dropNode: TreeNodeData;
          dropPosition: -1 | 0 | 1;
        }) => boolean
      >,
    },
    filterTreeNode: {
      type: Function as PropType<FilterTreeNode>,
    },
    /**
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动，[VirtualListProps](#virtuallistprops)
     * @en Pass virtual list properties, pass in this parameter to turn on virtual scrolling, [VirtualListProps](#virtuallistprops)
     */
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
    /**
     * @zh 是否默认展开已选中节点的父节点
     * @en Whether to expand the parent node of the selected node by default
     * @version 2.9.0
     */
    defaultExpandSelected: {
      type: Boolean,
    },
    /**
     * @zh 是否默认展开已选中复选框节点的父节点
     * @en Whether to expand the parent node of the checked node by default
     * @version 2.9.0
     */
    defaultExpandChecked: {
      type: Boolean,
    },
    /**
     * @zh 是否自动展开已展开节点的父节点
     * @en Whether to automatically expand the parent node of the expanded node
     * @version 2.9.0
     */
    autoExpandParent: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    /**
     * @zh 点击树节点时触发
     * @en Triggered when the tree node is clicked
     * @param {Array<string | number>} selectedKeys
     * @param {{ selected: boolean; selectedNodes: TreeNodeData[]; node: TreeNodeData; e: Event; }} event
     */
    'select',
    'update:selectedKeys',
    /**
     * @zh 点击树节点复选框时触发
     * @en Triggered when the tree node checkbox is clicked
     * @param {Array<string | number>} checkedKeys
     * @param {{ checked: boolean; checkedNodes: TreeNodeData[]; node: TreeNodeData; e: Event; }} event
     */
    'check',
    'update:checkedKeys',
    /**
     * @zh 展开/关闭
     * @en Expand/close
     * @param {Array<string | number>} expandKeys
     * @param {{ expand: boolean; expandNodes: TreeNodeData[]; node: TreeNodeData; e: Event; }} event
     */
    'expand',
    'update:expandedKeys',
    /**
     * @zh 节点开始拖拽
     * @en Node starts dragging
     */
    'dragStart',
    /**
     * @zh 节点结束拖拽
     * @en Node end drag
     * @param {DragEvent} event
     * @param {TreeNodeData} node
     */
    'dragEnd',
    /**
     * @zh 节点被拖拽至可释放目标
     * @en The node is dragged to the releasable target
     * @param {DragEvent} event
     * @param {TreeNodeData} node
     */
    'dragOver',
    /**
     * @zh 节点离开可释放目标
     * @en Node leaves to release the target
     * @param {DragEvent} event
     * @param {TreeNodeData} node
     */
    'dragLeave',
    /**
     * @zh 节点在可释放目标上释放
     * @en The node is released on a releasable target
     * @param {{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: -1 ｜ 0 ｜ 1; }} info
     */
    'drop',
  ],
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  /**
   * @zh 渲染额外的节点内容
   * @en Render additional node content
   * @slot extra
   */
  /**
   * @zh 定制 drag 图标
   * @en Custom drag icon
   * @slot drag-icon
   */
  /**
   * @zh 定制 loading 图标
   * @en Custom loading icon
   * @slot loading-icon
   */
  /**
   * @zh 定制 switcher 图标
   * @en Custom switcher icon
   * @slot switcher-icon
   */
  setup(props: TreeProps, { emit, slots }) {
    const {
      data: propTreeData,
      showLine,
      multiple,
      loadMore,
      checkStrictly,
      checkedKeys: propCheckedKeys,
      defaultCheckedKeys,
      selectedKeys: propSelectedKeys,
      defaultSelectedKeys,
      expandedKeys: propExpandedKeys,
      defaultExpandedKeys,
      checkedStrategy,
      selectable,
      checkable,
      blockNode,
      fieldNames,
      size,
      defaultExpandAll,
      filterTreeNode,
      draggable,
      allowDrop,
      defaultExpandSelected,
      defaultExpandChecked,
      autoExpandParent,
    } = toRefs(props);

    const prefixCls = getPrefixCls('tree');
    const classNames = computed(() => [
      `${prefixCls}`,
      {
        [`${prefixCls}-checkable`]: checkable.value,
        [`${prefixCls}-show-line`]: showLine.value,
      },
      `${prefixCls}-size-${size.value}`,
    ]);

    const switcherIcon = usePickSlots(slots, 'switcher-icon');
    const loadingIcon = usePickSlots(slots, 'loading-icon');
    const dragIcon = usePickSlots(slots, 'drag-icon');
    const nodeTitle = usePickSlots(slots, 'title');
    const nodeExtra = usePickSlots(slots, 'extra');

    const { treeData, flattenTreeData, key2TreeNode } = useTreeData(
      reactive({
        treeData: propTreeData,
        selectable,
        showLine,
        blockNode,
        checkable,
        fieldNames,
        loadMore,
        draggable,
      })
    );

    const { checkedKeys, indeterminateKeys, setCheckedState } = useCheckedState(
      reactive({
        defaultCheckedKeys,
        checkedKeys: propCheckedKeys,
        checkStrictly,
        key2TreeNode,
      })
    );
    const [selectedKeys, setSelectedKeys] = useMergeState<TreeNodeKey[]>(
      defaultSelectedKeys?.value || [],
      reactive({
        value: propSelectedKeys,
      })
    );
    const loadingKeys = ref<TreeNodeKey[]>([]);

    const dragNode = ref<TreeNodeData>();

    function getDefaultExpandedKeys() {
      if (defaultExpandedKeys?.value) {
        const expandedKeysSet = new Set<TreeNodeKey>([]);
        defaultExpandedKeys.value.forEach((_key) => {
          if (expandedKeysSet.has(_key)) return;

          const node = key2TreeNode.value[_key];
          if (!node) return;

          [
            ...(autoExpandParent.value ? node.pathParentKeys : []),
            _key,
          ].forEach((_key) => expandedKeysSet.add(_key));
        });
        return [...expandedKeysSet];
      }
      if (defaultExpandAll.value) {
        return flattenTreeData.value
          .filter((node) => node.children && node.children.length)
          .map((node) => node.key);
      }
      if (defaultSelectedKeys.value || defaultExpandChecked.value) {
        const expandedKeysSet = new Set<TreeNodeKey>([]);
        const addToExpandKeysSet = (keys: TreeNodeKey[]) => {
          keys.forEach((key) => {
            const node = key2TreeNode.value[key];
            if (!node) return;

            (node.pathParentKeys || []).forEach((k) => expandedKeysSet.add(k));
          });
        };
        if (defaultExpandSelected.value) {
          addToExpandKeysSet(selectedKeys.value);
        }
        if (defaultExpandChecked.value) {
          addToExpandKeysSet(checkedKeys.value);
        }
        return [...expandedKeysSet];
      }
      return [];
    }

    const [expandedKeys, setExpandKeys] = useMergeState<TreeNodeKey[]>(
      getDefaultExpandedKeys(),
      reactive({
        value: propExpandedKeys,
      })
    );

    const currentExpandKeys = ref<TreeNodeKey[]>([]);

    const visibleTreeNodeList = computed(() => {
      const expandedKeysSet = new Set(expandedKeys.value);
      const currentExpandKeysSet = new Set(currentExpandKeys.value);

      return flattenTreeData.value.filter((node) => {
        const passFilter =
          !filterTreeNode ||
          !filterTreeNode.value ||
          filterTreeNode?.value(node.treeNodeData);

        if (!passFilter) return false;

        const isRoot = isUndefined(node.parentKey);

        const isVisibleNode = node.pathParentKeys?.every(
          (_key) => expandedKeysSet.has(_key) && !currentExpandKeysSet.has(_key)
        );

        return isRoot || isVisibleNode;
      });
    });

    function onCheck(checked: boolean, key: TreeNodeKey, e?: Event) {
      const node = key2TreeNode.value[key];
      if (!node) return;

      const [newCheckedKeys, newIndeterminateKeys] = getCheckedStateByCheck({
        node,
        checked,
        checkedKeys: checkedKeys.value,
        indeterminateKeys: indeterminateKeys.value,
        checkStrictly: checkStrictly.value,
      });

      setCheckedState(newCheckedKeys, newIndeterminateKeys);

      let publicCheckedKeys = [...newCheckedKeys];
      if (checkedStrategy.value === 'parent') {
        publicCheckedKeys = newCheckedKeys.filter((_key) => {
          const item = key2TreeNode.value[_key];
          return !(
            !isUndefined(item.parentKey) &&
            newCheckedKeys.includes(item.parentKey)
          );
        });
      } else if (checkedStrategy.value === 'child') {
        publicCheckedKeys = newCheckedKeys.filter((_key) => {
          const item = key2TreeNode.value[_key];
          return !item.children?.length;
        });
      }

      emit('check', publicCheckedKeys, {
        checked,
        node: node.treeNodeData,
        checkedNodes: publicCheckedKeys.map(
          (v) => key2TreeNode.value[v]?.treeNodeData
        ),
        e,
      });
      emit('update:checkedKeys', publicCheckedKeys);
    }

    function onSelect(key: TreeNodeKey, e: Event) {
      const node = key2TreeNode.value[key];
      if (!node) return;

      let newSelectedKeys: TreeNodeKey[];
      let selected: boolean;

      if (multiple.value) {
        const selectedKeysSet = new Set(selectedKeys.value);
        selected = !selectedKeysSet.has(key);

        selected ? selectedKeysSet.add(key) : selectedKeysSet.delete(key);
        newSelectedKeys = [...selectedKeysSet];
      } else {
        selected = true;
        newSelectedKeys = [key];
      }
      setSelectedKeys(newSelectedKeys);
      emit('select', newSelectedKeys, {
        selected,
        node: node.treeNodeData,
        selectedNodes: newSelectedKeys.map(
          (v) => key2TreeNode.value[v]?.treeNodeData
        ),
        e,
      });
      emit('update:selectedKeys', newSelectedKeys);
    }

    function onExpand(expanded: boolean, key: TreeNodeKey, e?: Event) {
      // 如果当前 key 节点正在展开/收起，不执行操作。
      if (currentExpandKeys.value.includes(key)) return;

      const node = key2TreeNode.value[key];
      if (!node) return;

      const expandedKeysSet = new Set(expandedKeys.value);

      expanded ? expandedKeysSet.add(key) : expandedKeysSet.delete(key);
      const newExpandedKeys = [...expandedKeysSet];

      setExpandKeys(newExpandedKeys);
      currentExpandKeys.value.push(key);

      emit('expand', newExpandedKeys, {
        expanded,
        node: node.treeNodeData,
        expandedNodes: newExpandedKeys.map(
          (v) => key2TreeNode.value[v]?.treeNodeData
        ),
        e,
      });
      emit('update:expandedKeys', newExpandedKeys);
    }

    function onExpandEnd(key: TreeNodeKey) {
      const index = currentExpandKeys.value.indexOf(key);
      currentExpandKeys.value.splice(index, 1);
    }

    const onLoadMore = computed(() =>
      loadMore?.value
        ? async (key: TreeNodeKey) => {
            if (!isFunction(loadMore.value)) return;

            const node = key2TreeNode.value[key];
            if (!node) return;

            const { treeNodeData } = node;

            loadingKeys.value = [...new Set([...loadingKeys.value, key])];

            try {
              await loadMore.value(treeNodeData);
              loadingKeys.value = loadingKeys.value.filter((v) => v !== key);
              onExpand(true, key);
              if (checkedKeys.value.includes(key)) {
                onCheck(true, key);
              }
            } catch (err) {
              loadingKeys.value = loadingKeys.value.filter((v) => v !== key);
              // eslint-disable-next-line no-console
              console.error('[tree]load data error: ', err);
            }
          }
        : undefined
    );

    const treeContext = reactive({
      switcherIcon,
      loadingIcon,
      dragIcon,
      nodeTitle,
      nodeExtra,
      treeData,
      flattenTreeData,
      key2TreeNode,
      checkedKeys,
      indeterminateKeys,
      selectedKeys,
      expandedKeys,
      loadingKeys,
      currentExpandKeys,
      onLoadMore,
      onCheck,
      onSelect,
      onExpand,
      onExpandEnd,
      allowDrop(key: TreeNodeKey, dropPosition: DropPosition) {
        const nodeData = key2TreeNode.value[key];
        if (nodeData && isFunction(allowDrop?.value)) {
          return !!allowDrop?.value({
            dropNode: nodeData,
            dropPosition,
          });
        }
        return true;
      },
      onDragStart(key: TreeNodeKey, e: DragEvent) {
        const nodeData = key2TreeNode.value[key];
        dragNode.value = nodeData;
        if (nodeData) {
          emit('dragStart', e, nodeData);
        }
      },
      onDragEnd(key: TreeNodeKey, e: DragEvent) {
        const nodeData = key2TreeNode.value[key];
        dragNode.value = undefined;
        if (nodeData) {
          emit('dragEnd', e, nodeData);
        }
      },
      onDragOver(key: TreeNodeKey, e: DragEvent) {
        const nodeData = key2TreeNode.value[key];
        if (nodeData) {
          emit('dragOver', e, nodeData);
        }
      },
      onDragLeave(key: TreeNodeKey, e: DragEvent) {
        const nodeData = key2TreeNode.value[key];
        if (nodeData) {
          emit('dragLeave', e, nodeData);
        }
      },
      onDrop(key: TreeNodeKey, dropPosition: number, e: DragEvent) {
        const nodeData = key2TreeNode.value[key];
        if (
          dragNode.value &&
          nodeData &&
          !(
            nodeData.key === dragNode.value.key ||
            nodeData.pathParentKeys.includes(dragNode.value.key || '')
          )
        ) {
          emit('drop', {
            e,
            dragNode: dragNode.value,
            dropNode: nodeData,
            dropPosition,
          });
        }
      },
    });

    provide(TreeInjectionKey, treeContext);

    return {
      classNames,
      visibleTreeNodeList,
      treeContext,
      virtualListRef: ref(),
    };
  },

  methods: {
    toggleCheck(key: TreeNodeKey, e: Event) {
      const { key2TreeNode, onCheck, checkedKeys } = this.treeContext;
      const checked = !checkedKeys.includes(key);
      const node = key2TreeNode[key];
      if (node && isNodeCheckable(node)) {
        onCheck(checked, key, e);
      }
    },
    /**
     * @zh 虚拟列表滚动某个元素
     * @en Virtual list scroll to an element
     * @param {{ index?: number; key?: number | string; align: 'auto' | 'top' | 'bottom'}} options
     * @public
     */
    scrollIntoView(options: ScrollIntoViewOptions) {
      this.virtualListRef && this.virtualListRef.scrollTo(options);
    },
  },
});
</script>
