<template>
  <div :class="classNames" :data-level="level" :data-key="nodekey">
    <!-- 缩进 -->
    <span :class="`${prefixCls}-indent`">
      <span
        v-for="i in level"
        :key="i"
        :class="[
          `${prefixCls}-indent-block`,
          {
            [`${prefixCls}-indent-block-lineless`]: lineless[i - 1],
          },
        ]"
      />
    </span>
    <!-- switcher -->
    <span
      :class="[
        `${prefixCls}-switcher`,
        {
          [`${prefixCls}-switcher-expanded`]: expanded,
        },
      ]"
    >
      <NodeSwitcher
        :prefix-cls="prefixCls"
        :loading="loading"
        :show-line="showLine"
        :tree-node-data="treeNodeData"
        :icons="{
          switcherIcon,
          loadingIcon,
        }"
        :node-status="nodeStatus"
        @click="onSwitcherClick"
      >
        <template v-if="$slots['switcher-icon']" #switcher-icon>
          <!-- @slot 定制 switcher 图标，会覆盖 Tree 的配置 -->
          <slot name="switcher-icon" />
        </template>
        <template v-if="$slots['loading-icon']" #loading-icon>
          <!-- @slot 定制 loading 图标，会覆盖 Tree 的配置 -->
          <slot name="loading-icon" />
        </template>
      </NodeSwitcher>
    </span>
    <!-- checkbox -->
    <Checkbox
      v-if="checkable"
      :disabled="disableCheckbox || disabled"
      :model-value="checked"
      :indeterminate="indeterminate"
      uninject-group-context
      @change="onCheckboxChange"
    />

    <!-- 内容 -->
    <span
      ref="refTitle"
      :class="titleClassNames"
      :draggable="draggable"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      @click="onTitleClick"
    >
      <span
        v-if="$slots.icon || icon || treeNodeIcon"
        :class="[`${prefixCls}-icon`, `${prefixCls}-custom-icon`]"
      >
        <!-- 节点图标 -->
        <slot v-if="$slots.icon" name="icon" v-bind="nodeStatus" />
        <RenderFunction
          v-else-if="icon"
          :render-func="icon"
          v-bind="nodeStatus"
        />
        <RenderFunction
          v-else-if="treeNodeIcon"
          :render-func="treeNodeIcon"
          :node="treeNodeData"
          v-bind="nodeStatus"
        />
      </span>
      <span :class="`${prefixCls}-title-text`">
        <RenderFunction v-if="treeTitle" :render-func="treeTitle" />
        <!-- 标题，treeTitle 优先级高于节点的 title -->
        <slot v-else name="title">{{ title }}</slot>

        <span
          v-if="draggable"
          :class="[`${prefixCls}-icon`, `${prefixCls}-drag-icon`]"
        >
          <!-- 拖拽图标 -->
          <slot
            v-if="$slots['drag-icon']"
            name="drag-icon"
            v-bind="nodeStatus"
          />
          <RenderFunction
            v-else-if="dragIcon"
            :render-func="dragIcon"
            v-bind="nodeStatus"
          />
          <RenderFunction
            v-else-if="treeDragIcon"
            :render-func="treeDragIcon"
            :node="treeNodeData"
            v-bind="nodeStatus"
          />
          <IconDragDotVertical v-else />
        </span>
      </span>
    </span>
    <!-- 额外 -->
    <RenderFunction v-if="extra" :render-func="extra" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  toRefs,
  VNode,
  reactive,
  ref,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import useTreeContext from './hooks/use-tree-context';
import NodeSwitcher from './node-switcher.vue';
import useNodeKey from './hooks/use-node-key';
import Checkbox from '../checkbox';
import RenderFunction from '../_components/render-function';
import { isFunction } from '../_utils/is';
import { Node } from './interface';
import useDraggable from './hooks/use-draggable';
import IconDragDotVertical from '../icon/icon-drag-dot-vertical';
import { toArray } from '../_utils/to-array';

export default defineComponent({
  name: 'BaseTreeNode',
  components: {
    NodeSwitcher,
    Checkbox,
    RenderFunction,
    IconDragDotVertical,
  },
  props: {
    /** 唯一标示 */
    key: {
      type: [String, Number] as PropType<string | number>,
    },
    /** 标题 */
    title: {
      type: String,
    },
    /** 是否允许选中  */
    selectable: {
      type: Boolean,
    },
    /** 是否禁用节点 */
    disabled: {
      type: Boolean,
    },
    /** 是否禁用checkbox   */
    disableCheckbox: {
      type: Boolean,
    },
    /** 是否显示多选框   */
    checkable: {
      type: Boolean,
    },
    /** 是否可以拖拽   */
    draggable: {
      type: Boolean,
    },
    /** 是否是叶子节点。动态加载时有效 */
    isLeaf: {
      type: Boolean,
    },
    icon: {
      type: Function as PropType<() => VNode>,
    },
    switcherIcon: {
      type: Function as PropType<() => VNode>,
    },
    loadingIcon: {
      type: Function as PropType<() => VNode>,
    },
    dragIcon: {
      type: Function as PropType<() => VNode>,
    },
    isTail: {
      type: Boolean,
    },
    blockNode: {
      type: Boolean,
    },
    showLine: {
      type: Boolean,
    },
    level: {
      type: Number,
      default: 0,
    },
    lineless: {
      type: Array as PropType<boolean[]>,
      default: () => [],
    },
  },
  setup(props) {
    const key = useNodeKey();
    const prefixCls = getPrefixCls('tree-node');
    const treeContext = useTreeContext();
    const node = computed(
      () => treeContext.key2TreeNode?.get(key.value) as Node
    );
    const treeNodeData = computed(() => node.value.treeNodeData);
    const children = computed(() => node.value.children);
    const actionOnNodeClick = computed(() => {
      const action = treeContext.treeProps?.actionOnNodeClick;
      return action ? toArray(action) : [];
    });

    const { isLeaf, isTail, selectable, disabled, disableCheckbox, draggable } =
      toRefs(props);

    const classNames = computed(() => [
      `${prefixCls}`,
      {
        [`${prefixCls}-selected`]: selected.value,
        [`${prefixCls}-is-leaf`]: isLeaf.value,
        [`${prefixCls}-is-tail`]: isTail.value,
        [`${prefixCls}-expanded`]: expanded.value,
        [`${prefixCls}-disabled-selectable`]:
          !selectable.value && !treeContext.treeProps?.disableSelectActionOnly,
        [`${prefixCls}-disabled`]: disabled.value,
      },
    ]);

    const refTitle = ref<HTMLElement>();
    const { isDragOver, isDragging, isAllowDrop, dropPosition, setDragStatus } =
      useDraggable(
        reactive({
          key,
          refTitle,
        })
      );

    const titleClassNames = computed(() => [
      `${prefixCls}-title`,
      {
        [`${prefixCls}-title-draggable`]: draggable.value,
        [`${prefixCls}-title-gap-top`]:
          isDragOver.value && isAllowDrop.value && dropPosition.value < 0,
        [`${prefixCls}-title-gap-bottom`]:
          isDragOver.value && isAllowDrop.value && dropPosition.value > 0,
        [`${prefixCls}-title-highlight`]:
          !isDragging.value &&
          isDragOver.value &&
          isAllowDrop.value &&
          dropPosition.value === 0,
        [`${prefixCls}-title-dragging`]: isDragging.value,
        [`${prefixCls}-title-block`]: node.value.blockNode,
      },
    ]);

    const checked = computed(() =>
      treeContext.checkedKeys?.includes?.(key.value)
    );

    const indeterminate = computed(() =>
      treeContext.indeterminateKeys?.includes?.(key.value)
    );

    const selected = computed(() =>
      treeContext.selectedKeys?.includes?.(key.value)
    );

    const expanded = computed(() =>
      treeContext.expandedKeys?.includes?.(key.value)
    );

    const loading = computed(() =>
      treeContext.loadingKeys?.includes?.(key.value)
    );

    const treeDragIcon = computed(() => treeContext.dragIcon);

    const treeNodeIcon = computed(() => treeContext.nodeIcon);

    function onSwitcherClick(e: Event) {
      if (isLeaf.value) return;
      if (!children.value?.length && isFunction(treeContext.onLoadMore)) {
        treeContext.onLoadMore(key.value);
      } else {
        treeContext?.onExpand?.(!expanded.value, key.value, e);
      }
    }

    const nodeStatus = reactive({
      loading,
      checked,
      selected,
      indeterminate,
      expanded,
      isLeaf,
    });

    const treeTitle = computed(() =>
      treeContext.nodeTitle
        ? () => treeContext.nodeTitle?.(treeNodeData.value, nodeStatus)
        : undefined
    );
    const extra = computed(() =>
      treeContext.nodeExtra
        ? () => treeContext.nodeExtra?.(treeNodeData.value, nodeStatus)
        : undefined
    );

    return {
      nodekey: key,
      refTitle,
      prefixCls,
      classNames,
      titleClassNames,
      indeterminate,
      checked,
      expanded,
      selected,
      treeTitle,
      treeNodeData,
      loading,
      treeDragIcon,
      treeNodeIcon,
      extra,
      nodeStatus,
      onCheckboxChange(checked: boolean, e: Event) {
        if (disableCheckbox.value || disabled.value) {
          return;
        }
        treeContext.onCheck?.(checked, key.value, e);
      },
      onTitleClick(e: Event) {
        if (actionOnNodeClick.value.includes('expand')) {
          onSwitcherClick(e);
        }
        if (!selectable.value || disabled.value) return;
        treeContext.onSelect?.(key.value, e);
      },
      onSwitcherClick,
      onDragStart(e: DragEvent) {
        if (!draggable.value) return;

        e.stopPropagation();

        setDragStatus('dragStart', e);

        try {
          // ie throw error
          // firefox-need-it
          e.dataTransfer?.setData('text/plain', '');
        } catch (error) {
          // empty
        }
      },
      onDragEnd(e: DragEvent) {
        if (!draggable.value) return;

        e.stopPropagation();

        setDragStatus('dragEnd', e);
      },
      onDragOver(e: DragEvent) {
        if (!draggable) return;

        e.stopPropagation();
        e.preventDefault();

        setDragStatus('dragOver', e);
      },
      onDragLeave(e: DragEvent) {
        if (!draggable.value) return;

        e.stopPropagation();

        setDragStatus('dragLeave', e);
      },
      onDrop(e: DragEvent) {
        if (!draggable.value || !isAllowDrop.value) return;

        e.stopPropagation();
        e.preventDefault();

        setDragStatus('drop', e);
      },
    };
  },
});
</script>
