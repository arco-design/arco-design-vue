import { computed, defineComponent, PropType, ref, toRefs, Slots } from 'vue';

import { useScrollbar } from '../_hooks/use-scrollbar';
import { getPrefixCls } from '../_utils/global-config';
import Scrollbar, { ScrollbarProps } from '../scrollbar';
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
    scrollbar: {
      type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
      default: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { showCheckable, selectedKeys, treeProps, scrollbar } = toRefs(props);
    const { displayScrollbar, scrollbarProps } = useScrollbar(scrollbar);
    const prefixCls = getPrefixCls('tree-select');
    const refTree = ref();

    const computedTreeProps = computed(() => {
      return {
        ...treeProps.value,
        disableSelectActionOnly: true,
        checkedKeys: showCheckable.value ? selectedKeys.value : [],
        selectedKeys: showCheckable.value ? [] : selectedKeys.value,
      };
    });

    const treeWrapperClassName = computed(() => [
      `${prefixCls}-tree-wrapper`,
      computedTreeProps.value.virtualListProps && `${prefixCls}-tree-wrapper-virtual`,
    ]);

    const onSelect = (newVal: TreeNodeKey[], e: Event) => {
      if (showCheckable.value) {
        refTree.value?.toggleCheck?.(newVal[0], e);
      } else {
        emit('change', newVal);
      }
    };

    const onCheck = (newVal: TreeNodeKey[]) => {
      emit('change', newVal);
    };

    const renderTree = () => {
      return (
        <Tree
          ref={refTree}
          {...computedTreeProps.value}
          // @ts-ignore
          onSelect={onSelect}
          onCheck={onCheck}
          v-slots={props.treeSlots}
        />
      );
    };

    return () => {
      if (displayScrollbar.value) {
        return (
          <Scrollbar class={treeWrapperClassName.value} {...scrollbarProps.value}>
            {renderTree()}
          </Scrollbar>
        );
      }
      return <div class={treeWrapperClassName.value}>{renderTree()}</div>;
    };
  },
});
