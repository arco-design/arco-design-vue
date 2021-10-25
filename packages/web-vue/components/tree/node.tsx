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
  setup(props: TreeNodeProps) {
    const key = useNodeKey();
    return {
      key,
      props,
    };
  },
  render() {
    const { key, props } = this;
    return (
      <>
        <BaseTreeNode
          {...props}
          {...this.$attrs}
          key={key}
          v-slots={this.$slots}
        />
        <TransitionNodeList key={key} nodeKey={key} />
      </>
    );
  },
});
