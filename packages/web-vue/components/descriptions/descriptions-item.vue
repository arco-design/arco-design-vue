<template>
  <slot />
</template>

<script setup lang="ts">
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'DescriptionsItem' });

  const props = defineProps({
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
  });
  /**
   * @zh 标签
   * @en Label
   * @slot label
   * @version 2.18.0
   */
  const prefixCls = getPrefixCls('descriptions');
</script>
