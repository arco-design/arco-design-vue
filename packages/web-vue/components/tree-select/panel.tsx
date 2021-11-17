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
    checkable: {
      type: Boolean,
    },
    treeSlots: {
      type: Object as PropType<Slots>,
      default: () => ({}),
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { checkable, selectedKeys, treeProps } = toRefs(props);

    const refTree = ref();

    const computedTreeProps = computed(() => {
      const isCheckbox = checkable.value;
      return {
        ...treeProps.value,
        checkedKeys: isCheckbox ? selectedKeys.value : [],
        selectedKeys: isCheckbox ? [] : selectedKeys.value,
      };
    });

    return {
      refTree,
      computedTreeProps,
      onSelect(newVal: TreeNodeKey[], e: Event) {
        if (checkable.value) {
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
        checkable={this.checkable}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        v-slots={this.treeSlots}
      />
    );
  },
});
