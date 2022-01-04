<script lang="tsx">
import { computed, defineComponent, h, PropType, toRefs, VNode } from 'vue';
import RenderFunction from '../_components/render-function';
import IconLoading from '../icon/icon-loading';
import IconHover from '../_components/icon-hover.vue';
import IconCaretDown from '../icon/icon-caret-down';
import IconFile from '../icon/icon-file';
import useTreeContext from './hooks/use-tree-context';
import usePickSlots from '../_hooks/use-pick-slots';
import { TreeNodeData } from './interface';

export default defineComponent({
  name: 'TreeNodeSwitcher',
  components: {
    IconLoading,
    RenderFunction,
  },
  props: {
    prefixCls: String,
    expanded: Boolean,
    loading: Boolean,
    showLine: Boolean,
    isLeaf: Boolean,
    treeNodeData: {
      type: Object as PropType<TreeNodeData>,
    },
    icons: {
      type: Object as PropType<Record<string, () => VNode[]>>,
    },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const { icons } = toRefs(props);
    const treeContext = useTreeContext();

    const nodeSwitcherIcon = usePickSlots(slots, 'switcher-icon');
    const nodeLoadingIcon = usePickSlots(slots, 'loading-icon');

    return {
      switcherIcon: computed(
        () =>
          icons?.value?.switcherIcon ||
          nodeSwitcherIcon.value ||
          treeContext.switcherIcon
      ),
      loadingIcon: computed(
        () =>
          icons?.value?.loadingIcon ||
          nodeLoadingIcon.value ||
          treeContext.loadingIcon
      ),
      onClick(e: Event) {
        emit('click', e);
      },
    };
  },
  render() {
    const {
      prefixCls,
      switcherIcon,
      loadingIcon,
      onClick,
      expanded,
      loading,
      isLeaf,
      showLine,
      treeNodeData,
    } = this;

    if (loading) {
      return loadingIcon ? loadingIcon(treeNodeData) : h(IconLoading);
    }

    let icon = null;
    let needIconHover = false;

    if (!isLeaf) {
      const defaultIcon = showLine
        ? h('span', {
            class: `${prefixCls}-${expanded ? 'minus' : 'plus'}-icon`,
          })
        : h(IconCaretDown);
      icon = switcherIcon ? switcherIcon(treeNodeData) : defaultIcon;
      needIconHover = !showLine;
    } else if (showLine) {
      icon = switcherIcon ? switcherIcon(treeNodeData) : h(IconFile);
    }

    if (!icon) return null;

    const content = h(
      'span',
      { class: `${prefixCls}-switcher-icon`, onClick },
      icon
    );
    return needIconHover
      ? h(
          IconHover,
          {
            class: `${prefixCls}-icon-hover`,
          },
          () => content
        )
      : content;
  },
});
</script>
