import { defineComponent } from 'vue';
import { TreeNodeProps } from './interface';
import BaseTreeNode from './base-node.vue';
import useNodeKey from './hooks/use-node-key';
import TransitionNodeList from './transition-node-list.vue';

export default defineComponent({
  name: 'TreeNode',
  inheritAttrs: false,
  props: {
    ...BaseTreeNode.props,
  },
  setup(props, { slots, attrs }) {
    const key = useNodeKey();

    return () => {
      return (
        <>
          <BaseTreeNode {...props} {...attrs} key={key.value} v-slots={slots} />
          <TransitionNodeList key={key.value} nodeKey={key.value} />
        </>
      );
    };
  },
});
