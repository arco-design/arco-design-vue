<template>
  <div :class="prefixCls">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'TabPane',
  props: {
    /**
     * @zh 选项卡的标题
     * @en Title of the tab
     */
    title: String,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否允许关闭此选项卡（仅在可编辑模式生效）
     * @en Whether to allow this tab to be closed (only effective in editable mode)
     */
    closable: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const prefixCls = getPrefixCls('tabs-pane');

    return {
      prefixCls,
    };
  },
});
</script>
