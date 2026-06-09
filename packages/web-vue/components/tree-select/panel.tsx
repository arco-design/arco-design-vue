import { computed, defineComponent, PropType, ref, toRefs, Slots } from 'vue';
import type { DefineComponent } from 'vue';

import { useScrollbar } from '../_hooks/use-scrollbar';
import { getPrefixCls } from '../_utils/global-config';
import Scrollbar, { ScrollbarProps } from '../scrollbar';
import Tree from '../tree';
import { TreeProps, TreeNodeKey } from '../tree/interface';

type TreeInstance = {
  toggleCheck?: (key: TreeNodeKey, e: Event) => void;
};

type TreeComponentProps = InstanceType<typeof Tree>['$props'];

type TreeSelectPanelComponent = DefineComponent<{
  treeProps: Partial<TreeProps> | undefined;
  selectedKeys: TreeNodeKey[] | undefined;
  showCheckable: boolean;
  treeSlots: Slots;
  scrollbar: boolean | ScrollbarProps;
}>;

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
    const { scrollbarProps } = useScrollbar(scrollbar);
    const prefixCls = getPrefixCls('tree-select');
    const refTree = ref<TreeInstance>();

    const computedTreeProps = computed<Partial<TreeComponentProps>>(() => {
      return {
        ...(treeProps.value as Partial<TreeComponentProps>),
        disableSelectActionOnly: true,
        checkedKeys: showCheckable.value ? selectedKeys.value : [],
        selectedKeys: showCheckable.value ? [] : selectedKeys.value,
      };
    });

    const treeWrapperClassName = computed(() => [
      `${prefixCls}-tree-wrapper`,
      computedTreeProps.value.virtualListProps && `${prefixCls}-tree-wrapper-virtual`,
    ]);

    const onSelect: NonNullable<TreeProps['onSelect']> = (newVal, event) => {
      if (showCheckable.value) {
        if (newVal[0] !== undefined && event.e) {
          refTree.value?.toggleCheck?.(newVal[0], event.e);
        }
      } else {
        emit('change', newVal);
      }
    };

    const onCheck: NonNullable<TreeProps['onCheck']> = (newVal) => {
      emit('change', newVal);
    };

    const renderTree = () => {
      return (
        <Tree
          ref={refTree}
          {...computedTreeProps.value}
          onSelect={onSelect}
          onCheck={onCheck}
          v-slots={props.treeSlots}
        />
      );
    };

    return () => (
      <Scrollbar class={treeWrapperClassName.value} {...scrollbarProps.value}>
        {renderTree()}
      </Scrollbar>
    );
  },
}) as TreeSelectPanelComponent;
