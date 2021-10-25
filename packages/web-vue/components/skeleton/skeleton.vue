<template>
  <div :class="cls">
    <slot v-if="loading" />
    <slot v-else name="content" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'Skeleton',
  props: {
    /**
     * @zh 是否展示骨架屏（加载中状态）
     * @en Whether to display the skeleton screen (loading state)
     */
    loading: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否开启骨架屏动画
     * @en Whether to enable skeleton screen animation
     */
    animation: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('skeleton');

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-animation`]: props.animation,
      },
    ]);

    return {
      prefixCls,
      cls,
    };
  },
});
</script>
