<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'DescriptionsItem',
  props: {
    /**
     * @zh 所占列数
     * @en number of columns
     * @version 2.18.0
     */
    span: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 标签
     * @en Label
     * @version 2.18.0
     */
    label: String,
  },
  /**
   * @zh 标签
   * @en Label
   * @slot label
   * @version 2.18.0
   */
  setup() {
    const prefixCls = getPrefixCls('descriptions');

    return {
      prefixCls,
    };
  },
});
</script>
