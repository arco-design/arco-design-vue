<template>
  <main :class="classNames">
    <slot />
  </main>
</template>

<script setup lang="ts">
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'LayoutContent' });
  /**
   * @zh 内容
   * @en Content
   * @slot default
   */
  const prefixCls = getPrefixCls('layout-content');
  const classNames = [prefixCls];
</script>
