<template>
  <div :class="classNames">
    <VirtualList
      v-if="virtualListProps"
      ref="virtualListRef"
      v-bind="virtualListProps"
      :data="visibleTreeNodeList"
    >
      <template #item="{ item: node }">
        <TreeNode
          :key="`${searchValue}-${node.key}`"
          v-bind="node.treeNodeProps"
        />
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
import type {
  TreeFieldNames,
  TreeNodeData,
  FilterTreeNode,
  DropPosition,
  TreeNodeKey,
  CheckedStrategy,
  Node,
} from './interface';
import { isLeafNode, isNodeExpandable, isNodeSelectable } from './utils';
import { getCheckedStateByCheck, isNodeCheckable } from './utils/check-utils';
import TreeNode from './node';
import { isArray, isFunction, isUndefined } from '../_utils/is';
import useMergeState from '../_hooks/use-merge-state';
import useCheckedState from './hooks/use-checked-state';
import useTreeData from './hooks/use-tree-data';
import VirtualList from '../_components/virtual-list-v2';
import type {
  VirtualListProps,
  ScrollIntoViewOptions,
} from '../_components/virtual-list-v2/interface';

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
     * @zh 是否在节点前添加复选框，从 `2.27.0` 开始支持函数格式
     * @en Whether to add a checkbox before the node, function format is supported since `2.27.0`
     */
    checkable: {
      type: [Boolean, String, Function] as PropType<
        | boolean
        | ((
            node: TreeNodeData,
            info: {
              level: number;
              isLeaf: boolean;
            }
          ) => boolean)
      >,
      default: false,
    },
    /**
     * @zh 是否支持选择，从 `2.27.0` 开始支持函数格式
     * @en Whether to support selection, function format is supported since `2.27.0`
     * */
    selectable: {
      type: [Boolean, Function] as PropType<
        | boolean
        | ((
            node: TreeNodeData,
            info: {
              level: number;
              isLeaf: boolean;
            }
          ) => boolean)
      >,
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
      type: Object as PropType<TreeFieldNames>,
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
    searchValue: {
      type: String,
      default: '',
    },
    /**
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动，[VirtualListProps](#VirtualListProps)
     * @en Pass virtual list properties, pass in this parameter to turn on virtual scrolling, [VirtualListProps](#VirtualListProps)
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
    /**
     * @zh 半选状态的节点.仅在 checkable 且 checkStrictly 时生效
     * @en The keys of half checked. Only valid when checkable and checkStrictly
     * @version 2.19.0
     * @vModel
     */
    halfCheckedKeys: {
      type: Array as PropType<Array<string | number>>,
    },
    /**
     * @zh 开启后 checkedKeys 只处理叶子节点，父节点状态由子节点决定（仅在 checkable 且 checkStrictly 为 false 时生效）
     * @en When enabled, checkedKeys is only for checked leaf nodes, and the status of the parent node is determined by the child node.(Only valid when checkable and checkStrictly is false)
     * @version 2.21.0
     */
    onlyCheckLeaf: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启展开时的过渡动效
     * @en Whether to enable expand transition animation
     * @version 2.21.0
     */
    animation: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 点击节点的时候触发的动作
     * @en The action triggered when the node is clicked
     * @version 2.27.0
     */
    actionOnNodeClick: {
      type: String as PropType<'expand'>,
    },
    // internal
    disableSelectActionOnly: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /**
     * @zh 点击树节点时触发
     * @en Triggered when the tree node is clicked
     * @param {Array<string | number>} selectedKeys
     * @param {{ selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }} data
     */
    'select': (
      selectedKeys: (string | number)[],
      data: {
        selected?: boolean;
        selectedNodes: TreeNodeData[];
        node?: TreeNodeData;
        e?: Event;
      }
    ) => true,
    'update:selectedKeys': (selectedKeys: (string | number)[]) => true,
    /**
     * @zh 点击树节点复选框时触发。`halfCheckedKeys` 和 `halfCheckedNodes` 从 `2.19.0` 开始支持。
     * @en Triggered when the tree node checkbox is clicked. `halfCheckedKeys` and `halfCheckedNodes` support from `2.19.0`.
     * @param {Array<string | number>} checkedKeys
     * @param {{ checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string | number)[]; halfCheckedNodes: TreeNodeData[]; }} data
     */
    'check': (
      checkedKeys: (string | number)[],
      data: {
        checked?: boolean;
        checkedNodes: TreeNodeData[];
        node?: TreeNodeData;
        halfCheckedKeys: (string | number)[];
        halfCheckedNodes: TreeNodeData[];
        e?: Event;
      }
    ) => true,
    'update:checkedKeys': (checkedKeys: (string | number)[]) => true,
    'update:halfCheckedKeys': (halfCheckedKeys: (string | number)[]) => true,
    /**
     * @zh 展开/关闭
     * @en Expand/close
     * @param {Array<string | number>} expandKeys
     * @param {{ expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }} data
     */
    'expand': (
      expandKeys: (string | number)[],
      data: {
        expanded?: boolean;
        expandedNodes: TreeNodeData[];
        node?: TreeNodeData;
        e?: Event;
      }
    ) => true,
    'update:expandedKeys': (expandKeys: (string | number)[]) => true,
    /**
     * @zh 节点开始拖拽
     * @en Node starts dragging
     */
    'dragStart': (ev: DragEvent, node: TreeNodeData) => true,
    /**
     * @zh 节点结束拖拽
     * @en Node end drag
     * @param {DragEvent} ev
     * @param {TreeNodeData} node
     */
    'dragEnd': (ev: DragEvent, node: TreeNodeData) => true,
    /**
     * @zh 节点被拖拽至可释放目标
     * @en The node is dragged to the releasable target
     * @param {DragEvent} ev
     * @param {TreeNodeData} node
     */
    'dragOver': (ev: DragEvent, node: TreeNodeData) => true,
    /**
     * @zh 节点离开可释放目标
     * @en Node leaves to release the target
     * @param {DragEvent} ev
     * @param {TreeNodeData} node
     */
    'dragLeave': (ev: DragEvent, node: TreeNodeData) => true,
    /**
     * @zh 节点在可释放目标上释放
     * @en The node is released on a releasable target
     * @param {{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: number; }} data
     */
    'drop': (data: {
      e: DragEvent;
      dragNode: TreeNodeData;
      dropNode: TreeNodeData;
      dropPosition: number;
    }) => true,
  },
  /**
   * @zh 定制节点图标
   * @en Custom node icon
   * @slot icon
   * @binding {TreeNodeData} node
   * @version 2.18.0
   */
  /**
   * @zh 定制 switcher 图标
   * @en Custom switcher icon
   * @slot switcher-icon
   */
  /**
   * @zh 定制 loading 图标
   * @en Custom loading icon
   * @slot loading-icon
   */
  /**
   * @zh 定制 drag 图标
   * @en Custom drag icon
   * @slot drag-icon
   * @binding {TreeNodeData} node
   */
  /**
   * @zh 渲染额外的节点内容
   * @en Render additional node content
   * @slot extra
   */
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  setup(props, { emit, slots }) {
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
      halfCheckedKeys,
      onlyCheckLeaf,
      animation,
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
    const nodeIcon = usePickSlots(slots, 'icon');
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
        halfCheckedKeys,
        onlyCheckLeaf,
      })
    );
    const [selectedKeys, setSelectedState] = useMergeState<TreeNodeKey[]>(
      defaultSelectedKeys?.value || [],
      reactive({
        value: propSelectedKeys,
      })
    );
    const loadingKeys = ref<TreeNodeKey[]>([]);

    const dragNode = ref<Node>();

    function getDefaultExpandedKeys() {
      if (defaultExpandedKeys?.value) {
        const expandedKeysSet = new Set<TreeNodeKey>([]);
        defaultExpandedKeys.value.forEach((_key) => {
          if (expandedKeysSet.has(_key)) return;

          const node = key2TreeNode.value.get(_key);
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
      if (defaultExpandSelected.value || defaultExpandChecked.value) {
        const expandedKeysSet = new Set<TreeNodeKey>([]);
        const addToExpandKeysSet = (keys: TreeNodeKey[]) => {
          keys.forEach((key) => {
            const node = key2TreeNode.value.get(key);
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

    const [expandedKeys, setExpandState] = useMergeState<TreeNodeKey[]>(
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

    function getPublicCheckedKeys(
      rawCheckedKeys: TreeNodeKey[],
      rawCheckedStrategy = checkedStrategy.value
    ) {
      let publicCheckedKeys = [...rawCheckedKeys];
      if (rawCheckedStrategy === 'parent') {
        publicCheckedKeys = rawCheckedKeys.filter((_key) => {
          const item = key2TreeNode.value.get(_key);
          return (
            item &&
            !(
              !isUndefined(item.parentKey) &&
              rawCheckedKeys.includes(item.parentKey)
            )
          );
        });
      } else if (rawCheckedStrategy === 'child') {
        publicCheckedKeys = rawCheckedKeys.filter((_key) => {
          return !key2TreeNode.value.get(_key)?.children?.length;
        });
      }
      return publicCheckedKeys;
    }

    function getNodes(keys: TreeNodeKey[]) {
      return keys
        .map((key) => key2TreeNode.value.get(key)?.treeNodeData || undefined)
        .filter(Boolean);
    }

    function emitCheckEvent(options: {
      targetKey?: TreeNodeKey;
      targetChecked?: boolean;
      newCheckedKeys: TreeNodeKey[];
      newIndeterminateKeys: TreeNodeKey[];
      event?: Event;
    }) {
      const {
        targetKey,
        targetChecked,
        newCheckedKeys,
        newIndeterminateKeys,
        event,
      } = options;
      const targetNode = targetKey
        ? key2TreeNode.value.get(targetKey)
        : undefined;
      const publicCheckedKeys = getPublicCheckedKeys(newCheckedKeys);
      emit('update:checkedKeys', publicCheckedKeys);
      emit('update:halfCheckedKeys', newIndeterminateKeys);
      emit('check', publicCheckedKeys, {
        checked: targetChecked,
        node: targetNode?.treeNodeData,
        checkedNodes: getNodes(publicCheckedKeys) as TreeNodeData[],
        halfCheckedKeys: newIndeterminateKeys,
        halfCheckedNodes: getNodes(newIndeterminateKeys) as TreeNodeData[],
        e: event,
      });
    }

    function emitSelectEvent(options: {
      targetKey?: TreeNodeKey;
      targetSelected?: boolean;
      newSelectedKeys: TreeNodeKey[];
      event?: Event;
    }) {
      const { targetKey, targetSelected, newSelectedKeys, event } = options;
      const targetNode = targetKey
        ? key2TreeNode.value.get(targetKey)
        : undefined;
      emit('update:selectedKeys', newSelectedKeys);
      emit('select', newSelectedKeys, {
        selected: targetSelected,
        node: targetNode?.treeNodeData,
        selectedNodes: getNodes(newSelectedKeys) as TreeNodeData[],
        e: event,
      });
    }

    function emitExpandEvent(options: {
      targetKey?: TreeNodeKey;
      targetExpanded?: boolean;
      newExpandedKeys: TreeNodeKey[];
      event?: Event;
    }) {
      const { targetKey, targetExpanded, newExpandedKeys, event } = options;
      const targetNode = targetKey
        ? key2TreeNode.value.get(targetKey)
        : undefined;
      emit('expand', newExpandedKeys, {
        expanded: targetExpanded,
        node: targetNode?.treeNodeData,
        expandedNodes: getNodes(newExpandedKeys) as TreeNodeData[],
        e: event,
      });
      emit('update:expandedKeys', newExpandedKeys);
    }

    function setCheckedKeys(keys: TreeNodeKey[]) {
      const [newCheckedKeys, newIndeterminateKeys] = setCheckedState(
        keys,
        [],
        true
      );
      emitCheckEvent({ newCheckedKeys, newIndeterminateKeys });
    }

    function setSelectedKeys(keys: TreeNodeKey[]) {
      let newSelectedKeys = keys;
      if (!multiple.value && keys.length > 1) {
        newSelectedKeys = [keys[0]];
      }
      setSelectedState(newSelectedKeys);
      emitSelectEvent({
        newSelectedKeys,
      });
    }

    function setExpandedKeys(keys: TreeNodeKey[]) {
      currentExpandKeys.value = [];
      setExpandState(keys);
      emitExpandEvent({ newExpandedKeys: keys });
    }

    function checkNodes(
      keys: TreeNodeKey[],
      checked: boolean,
      targetKey?: TreeNodeKey
    ) {
      if (!keys.length) return;
      let newCheckedKeys = [...checkedKeys.value];
      let newIndeterminateKeys = [...indeterminateKeys.value];
      keys.forEach((key) => {
        const node = key2TreeNode.value.get(key);
        if (node) {
          [newCheckedKeys, newIndeterminateKeys] = getCheckedStateByCheck({
            node,
            checked,
            checkedKeys: [...newCheckedKeys],
            indeterminateKeys: [...newIndeterminateKeys],
            checkStrictly: checkStrictly.value,
          });
        }
      });
      setCheckedState(newCheckedKeys, newIndeterminateKeys);
      emitCheckEvent({
        targetKey,
        targetChecked: isUndefined(targetKey) ? undefined : checked,
        newCheckedKeys,
        newIndeterminateKeys,
      });
    }

    function selectNodes(
      keys: TreeNodeKey[],
      selected: boolean,
      targetKey?: TreeNodeKey
    ) {
      if (!keys.length) return;

      let newSelectedKeys: TreeNodeKey[];

      if (multiple.value) {
        const selectedKeysSet = new Set(selectedKeys.value);
        keys.forEach((key) => {
          selected ? selectedKeysSet.add(key) : selectedKeysSet.delete(key);
        });
        newSelectedKeys = [...selectedKeysSet];
      } else {
        newSelectedKeys = selected ? [keys[0]] : [];
      }

      setSelectedState(newSelectedKeys);
      emitSelectEvent({
        targetKey,
        targetSelected: isUndefined(targetKey) ? undefined : selected,
        newSelectedKeys,
      });
    }

    function expandNodes(
      keys: TreeNodeKey[],
      expanded: boolean,
      targetKey?: TreeNodeKey
    ) {
      const expandedKeysSet = new Set(expandedKeys.value);

      keys.forEach((key) => {
        expanded ? expandedKeysSet.add(key) : expandedKeysSet.delete(key);
        onExpandEnd(key);
      });
      const newExpandedKeys = [...expandedKeysSet];

      setExpandState(newExpandedKeys);
      emitExpandEvent({
        targetKey,
        targetExpanded: isUndefined(targetKey) ? undefined : expanded,
        newExpandedKeys,
      });
    }

    function onCheck(checked: boolean, key: TreeNodeKey, e?: Event) {
      const node = key2TreeNode.value.get(key);
      if (!node) return;

      const [newCheckedKeys, newIndeterminateKeys] = getCheckedStateByCheck({
        node,
        checked,
        checkedKeys: checkedKeys.value,
        indeterminateKeys: indeterminateKeys.value,
        checkStrictly: checkStrictly.value,
      });

      setCheckedState(newCheckedKeys, newIndeterminateKeys);
      emitCheckEvent({
        targetKey: key,
        targetChecked: checked,
        newCheckedKeys,
        newIndeterminateKeys,
        event: e,
      });
    }

    function onSelect(key: TreeNodeKey, e: Event) {
      const node = key2TreeNode.value.get(key);
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

      setSelectedState(newSelectedKeys);
      emitSelectEvent({
        targetKey: key,
        targetSelected: selected,
        newSelectedKeys,
        event: e,
      });
    }

    function onExpand(expanded: boolean, key: TreeNodeKey, e?: Event) {
      // 如果当前 key 节点正在展开/收起，不执行操作。
      if (currentExpandKeys.value.includes(key)) return;

      const node = key2TreeNode.value.get(key);
      if (!node) return;

      const expandedKeysSet = new Set(expandedKeys.value);

      expanded ? expandedKeysSet.add(key) : expandedKeysSet.delete(key);
      const newExpandedKeys = [...expandedKeysSet];

      setExpandState(newExpandedKeys);
      if (animation.value) {
        currentExpandKeys.value.push(key);
      }

      emitExpandEvent({
        targetKey: key,
        targetExpanded: expanded,
        newExpandedKeys,
        event: e,
      });
    }

    function onExpandEnd(key: TreeNodeKey) {
      const index = currentExpandKeys.value.indexOf(key);
      currentExpandKeys.value.splice(index, 1);
    }

    const onLoadMore = computed(() =>
      loadMore?.value
        ? async (key: TreeNodeKey) => {
            if (!isFunction(loadMore.value)) return;

            const node = key2TreeNode.value.get(key);
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
      treeProps: props,
      switcherIcon,
      loadingIcon,
      dragIcon,
      nodeIcon,
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
      filterTreeNode,
      onCheck,
      onSelect,
      onExpand,
      onExpandEnd,
      allowDrop(key: TreeNodeKey, dropPosition: DropPosition) {
        const node = key2TreeNode.value.get(key);
        if (node && isFunction(allowDrop.value)) {
          return !!allowDrop.value({
            dropNode: node.treeNodeData,
            dropPosition,
          });
        }
        return true;
      },
      onDragStart(key: TreeNodeKey, e: DragEvent) {
        const node = key2TreeNode.value.get(key);
        dragNode.value = node;
        if (node) {
          emit('dragStart', e, node.treeNodeData);
        }
      },
      onDragEnd(key: TreeNodeKey, e: DragEvent) {
        const node = key2TreeNode.value.get(key);
        dragNode.value = undefined;
        if (node) {
          emit('dragEnd', e, node.treeNodeData);
        }
      },
      onDragOver(key: TreeNodeKey, e: DragEvent) {
        const node = key2TreeNode.value.get(key);
        if (node) {
          emit('dragOver', e, node.treeNodeData);
        }
      },
      onDragLeave(key: TreeNodeKey, e: DragEvent) {
        const node = key2TreeNode.value.get(key);
        if (node) {
          emit('dragLeave', e, node.treeNodeData);
        }
      },
      onDrop(key: TreeNodeKey, dropPosition: number, e: DragEvent) {
        const node = key2TreeNode.value.get(key);
        if (
          dragNode.value &&
          node &&
          !(
            node.key === dragNode.value.key ||
            node.pathParentKeys.includes(dragNode.value.key || '')
          )
        ) {
          emit('drop', {
            e,
            dragNode: dragNode.value.treeNodeData,
            dropNode: node.treeNodeData,
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
      computedSelectedKeys: selectedKeys,
      computedExpandedKeys: expandedKeys,
      computedCheckedKeys: checkedKeys,
      computedIndeterminateKeys: indeterminateKeys,
      getPublicCheckedKeys,
      getNodes,
      internalCheckNodes: checkNodes,
      internalSetCheckedKeys: setCheckedKeys,
      internalSelectNodes: selectNodes,
      internalSetSelectedKeys: setSelectedKeys,
      internalExpandNodes: expandNodes,
      internalSetExpandedKeys: setExpandedKeys,
    };
  },

  methods: {
    toggleCheck(key: TreeNodeKey, e: Event) {
      const { key2TreeNode, onCheck, checkedKeys } = this.treeContext;
      const checked = !checkedKeys.includes(key);
      const node = key2TreeNode.get(key);
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
    /**
     * @zh 获取选中的节点
     * @en Get selected nodes
     * @returns {TreeNodeData[]}
     * @public
     * @version 2.19.0
     */
    getSelectedNodes() {
      return this.getNodes(this.computedSelectedKeys);
    },
    /**
     * @zh 获取选中复选框的节点。支持传入 `checkedStrategy`，没有传则取组件的配置。
     * @en Get checked nodes. Supports passing in `checkedStrategy`, if not passed, the configuration of the component is taken.
     * @param { checkedStrategy?: 'all' | 'parent' | 'child'; includeHalfChecked?: boolean; } options
     * @returns {TreeNodeData[]}
     * @public
     * @version 2.19.0
     */
    getCheckedNodes(
      options: {
        checkedStrategy?: CheckedStrategy;
        includeHalfChecked?: boolean;
      } = {}
    ) {
      const { checkedStrategy, includeHalfChecked } = options;
      const checkedKeys = this.getPublicCheckedKeys(
        this.computedCheckedKeys,
        checkedStrategy
      );
      const checkedNodes = this.getNodes(checkedKeys);
      return [
        ...checkedNodes,
        ...(includeHalfChecked ? this.getHalfCheckedNodes() : []),
      ];
    },
    /**
     * @zh 获取复选框半选的节点
     * @en Get half checked nodes
     * @returns {TreeNodeData[]}
     * @public
     * @version 2.19.0
     */
    getHalfCheckedNodes() {
      return this.getNodes(this.computedIndeterminateKeys);
    },
    /**
     * @zh 获取展开的节点
     * @en Get expanded nodes
     * @returns {TreeNodeData[]}
     * @public
     * @version 2.19.0
     */
    getExpandedNodes() {
      return this.getNodes(this.computedExpandedKeys);
    },
    /**
     * @zh 设置全部节点的复选框状态
     * @en Set the checkbox state of all nodes
     * @param { boolean } checked
     * @public
     * @version 2.20.0
     */
    checkAll(checked = true) {
      const { key2TreeNode } = this.treeContext;
      const newKeys = checked
        ? [...key2TreeNode.keys()].filter((key) => {
            const node = key2TreeNode.get(key);
            return node && isNodeCheckable(node);
          })
        : [];
      this.internalSetCheckedKeys(newKeys);
    },
    /**
     * @zh 设置指定节点的复选框状态
     * @en Sets the checkbox state of the specified node
     * @param { TreeNodeKey | TreeNodeKey[] } key
     * @param { boolean } checked
     * @param { boolean } onlyCheckLeaf
     * @public
     * @version 2.20.0，onlyCheckLeaf from 2.21.0
     */
    checkNode(
      key: TreeNodeKey | TreeNodeKey[],
      checked = true,
      onlyCheckLeaf = false
    ) {
      const { checkStrictly, treeContext } = this;
      const { key2TreeNode } = treeContext;
      const isBatch = isArray(key);
      const keys = (isBatch ? key : [key]).filter((key) => {
        const node = key2TreeNode.get(key);
        return (
          node &&
          isNodeCheckable(node) &&
          (checkStrictly || !onlyCheckLeaf || isLeafNode(node)) // onlyCheckLeaf 仅在 checkStrictly 为 false 的时候有效
        );
      });
      this.internalCheckNodes(keys, checked, isBatch ? undefined : key);
    },
    /**
     * @zh 设置全部节点的选中状态
     * @en Set the selected state of all nodes
     * @param { boolean } selected
     * @public
     * @version 2.20.0
     */
    selectAll(selected = true) {
      const { key2TreeNode } = this.treeContext;
      const newKeys = selected
        ? [...key2TreeNode.keys()].filter((key) => {
            const node = key2TreeNode.get(key);
            return node && isNodeSelectable(node);
          })
        : [];

      this.internalSetSelectedKeys(newKeys);
    },
    /**
     * @zh 设置指定节点的选中状态
     * @en Sets the selected state of the specified node
     * @param { TreeNodeKey | TreeNodeKey[] } key
     * @param { boolean } selected
     * @public
     * @version 2.20.0
     */
    selectNode(key: TreeNodeKey | TreeNodeKey[], selected = true) {
      const { key2TreeNode } = this.treeContext;
      const isBatch = isArray(key);
      const keys = (isBatch ? key : [key]).filter((key) => {
        const node = key2TreeNode.get(key);
        return node && isNodeSelectable(node);
      });
      this.internalSelectNodes(keys, selected, isBatch ? undefined : key);
    },
    /**
     * @zh 设置全部节点的展开状态
     * @en Set the expanded state of all nodes
     * @param { boolean } expanded
     * @public
     * @version 2.20.0
     */
    expandAll(expanded = true) {
      const { key2TreeNode } = this.treeContext;
      const newKeys = expanded
        ? [...key2TreeNode.keys()].filter((key) => {
            const node = key2TreeNode.get(key);
            return node && isNodeExpandable(node);
          })
        : [];

      this.internalSetExpandedKeys(newKeys);
    },
    /**
     * @zh 设置指定节点的展开状态
     * @en Sets the expanded state of the specified node
     * @param { TreeNodeKey | TreeNodeKey[] } key
     * @param { boolean } expanded
     * @public
     * @version 2.20.0
     */
    expandNode(key: TreeNodeKey | TreeNodeKey[], expanded = true) {
      const { key2TreeNode } = this.treeContext;
      const isBatch = isArray(key);
      const keys = (isBatch ? key : [key]).filter((key) => {
        const node = key2TreeNode.get(key);
        return node && isNodeExpandable(node);
      });
      this.internalExpandNodes(keys, expanded, isBatch ? undefined : key);
    },
  },
});
</script>
