<template>
  <li :class="`${prefixCls}-title`">
    <slot name="title">
      {{ title }}
    </slot>
  </li>
  <slot />
</template>

<script setup lang="ts">
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'Dgroup' });

  defineProps({
    /**
     * @zh 分组标题
     * @en Group title
     */
    title: String,
  });
  /**
   * @zh 分组标题
   * @en Group title
   * @slot title
   * @version 2.10.0
   */
  const prefixCls = getPrefixCls('dropdown-group');
</script>
