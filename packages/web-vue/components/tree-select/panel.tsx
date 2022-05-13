import { computed, defineComponent, PropType, ref, toRefs, Slots } from 'vue';
import Tree from '../tree';
import {
  TreeProps,
  TreeNodeKey,
  SelectableType,
  TreeNodeData,
} from '../tree/interface';
import { isFunction } from '../_utils/is';

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
    selectable: {
      type: [Boolean, String, Function] as PropType<SelectableType | 'leaf'>,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { checkable, selectedKeys, treeProps, selectable } = toRefs(props);
    const refTree = ref();
    const isSelectable = (
      node: TreeNodeData,
      info: { level: number; isLeaf: boolean }
    ) => {
      if (selectable.value === 'leaf') return info.isLeaf;
      if (isFunction(selectable.value)) return selectable.value(node, info);
      return selectable.value ?? false;
    };

    const computedTreeProps = computed(() => {
      const isCheckbox = checkable.value;
      return {
        actionOnNodeClick: selectable.value === 'leaf' ? 'expand' : undefined,
        ...treeProps.value,
        checkable: isCheckbox && isSelectable,
        selectable: isSelectable,
        disableSelectActionOnly: true,
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
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        v-slots={this.treeSlots}
      />
    );
  },
});
