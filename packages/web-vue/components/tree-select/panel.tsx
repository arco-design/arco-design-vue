import { computed, defineComponent, PropType, ref, toRefs, Slots } from 'vue';
import Tree from '../tree';
import { TreeProps, TreeNodeKey } from '../tree/interface';

export default defineComponent({
  name: 'TreeSelectPanel',
  components: {
    Tree,
  },
  props: {
    treeProps: {
      type: Object as PropType<Partial<TreeProps>>,
      default: () => ({}),
    },
    selectedKeys: {
      type: Array as PropType<TreeNodeKey[]>,
    },
    showCheckable: {
      type: Boolean,
    },
    treeSlots: {
      type: Object as PropType<Slots>,
      default: () => ({}),
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { showCheckable, selectedKeys, treeProps } = toRefs(props);
    const refTree = ref();

    const computedTreeProps = computed(() => {
      return {
        ...treeProps.value,
        disableSelectActionOnly: true,
        checkedKeys: showCheckable.value ? selectedKeys.value : [],
        selectedKeys: showCheckable.value ? [] : selectedKeys.value,
      };
    });

    return {
      refTree,
      computedTreeProps,
      onSelect(newVal: TreeNodeKey[], e: Event) {
        if (showCheckable.value) {
          refTree.value?.toggleCheck?.(newVal[0], e);
        } else {
          emit('change', newVal);
        }
      },
      onCheck(newVal: TreeNodeKey[]) {
        emit('change', newVal);
      },
    };
  },
  render() {
    return (
      <Tree
        ref="refTree"
        {...this.computedTreeProps}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        v-slots={this.treeSlots}
      />
    );
  },
});
