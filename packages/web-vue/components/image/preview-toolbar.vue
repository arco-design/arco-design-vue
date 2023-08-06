<template>
  <div :class="prefixCls">
    <PreviewAction
      v-for="action in resultActions"
      :key="action.key"
      :name="action.name"
      :disabled="action.disabled"
      @click="action.onClick"
    >
      <RenderFunction :render-func="action.content" />
    </PreviewAction>
    <slot />
  </div>
</template>
<script lang="tsx">
import { defineComponent, PropType, toRefs, computed } from 'vue';
import RenderFunction, { RenderFunc } from '../_components/render-function';
import { getPrefixCls } from '../_utils/global-config';
import PreviewAction from './preview-action';

interface ActionType {
  key: string;
  name: string;
  content: RenderFunc;
  onClick: () => void;
  disabled?: boolean;
}

export default defineComponent({
  name: 'ImagePreviewToolbar',
  components: {
    RenderFunction,
    PreviewAction,
  },
  props: {
    actions: {
      type: Array as PropType<ActionType[]>,
      default: () => [],
    },
    /** 控制条的布局 */
    actionsLayout: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { actions, actionsLayout } = toRefs(props);

    const prefixCls = getPrefixCls('image-preview-toolbar');

    const resultActions = computed(() => {
      // 根据 layout 过滤
      const actionsLayoutSet = new Set(actionsLayout.value);
      const filterWithLayout = (item: ActionType) =>
        actionsLayoutSet.has(item.key);
      const filteredActions = actions.value.filter(filterWithLayout);

      // 根据 layout 排序
      return filteredActions.sort((pre, cur) => {
        const preIndex = actionsLayout.value.indexOf(pre.key);
        const curIndex = actionsLayout.value.indexOf(cur.key);
        return preIndex > curIndex ? 1 : -1;
      });
    });

    return {
      prefixCls,
      resultActions,
    };
  },
});
</script>
