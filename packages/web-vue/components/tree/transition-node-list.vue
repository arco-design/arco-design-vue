<template>
  <ExpandTransition :expanded="expanded" @end="onTransitionEnd">
    <div v-if="show" :class="classNames">
      <BaseTreeNode
        v-for="node in visibleNodeList"
        :key="node.key"
        v-bind="node.treeNodeProps"
      />
    </div>
  </ExpandTransition>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import ExpandTransition from './expand-transition.vue';
import { getPrefixCls } from '../_utils/global-config';
import useTreeContext from './hooks/use-tree-context';
import BaseTreeNode from './base-node.vue';
import { TreeNodeKey } from './interface';

export default defineComponent({
  name: 'TransitionNodeList',
  components: {
    ExpandTransition,
    BaseTreeNode,
  },
  props: {
    nodeKey: {
      type: [String, Number] as PropType<TreeNodeKey>,
      required: true,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('tree');
    const classNames = [`${prefixCls}-node-list`];

    const treeContext = useTreeContext();

    const { nodeKey } = toRefs(props);

    const expanded = computed(() =>
      treeContext.expandedKeys?.includes?.(nodeKey.value)
    );

    const visibleNodeList = computed(() => {
      const expandedKeysSet = new Set(treeContext.expandedKeys || []);
      const childNodeList = treeContext.flattenTreeData?.filter((node) => {
        if (node.pathParentKeys?.includes(nodeKey.value)) {
          return (
            !treeContext.filterTreeNode ||
            treeContext.filterTreeNode?.(node.treeNodeData)
          );
        }
        return false;
      });

      return childNodeList?.filter((node) => {
        if (expanded.value) {
          // When expanding, only when each parent node is in expanded state will it be displayed by itself
          return node.pathParentKeys?.every((_key) =>
            expandedKeysSet.has(_key)
          );
        }
        // When collapsed, only when all the parent nodes after the position corresponding to the nodeKey are in the expanded state, will they be displayed
        const index = node.pathParentKeys.indexOf(nodeKey.value);
        return node.pathParentKeys
          .slice(index + 1)
          .every((_key) => expandedKeysSet.has(_key));
      });
    });

    const show = computed(
      () =>
        treeContext.currentExpandKeys?.includes(nodeKey.value) &&
        visibleNodeList.value?.length
    );

    return {
      classNames,
      visibleNodeList,
      show,
      expanded,
      onTransitionEnd() {
        treeContext.onExpandEnd?.(nodeKey.value);
      },
    };
  },
});
</script>
