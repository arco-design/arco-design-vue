<template>
  <footer :class="classNames">
    <slot />
  </footer>
</template>

<script setup lang="ts">
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'LayoutFooter' });
  /**
   * @zh 内容
   * @en Content
   * @slot default
   */
  const prefixCls = getPrefixCls('layout-footer');
  const classNames = [prefixCls];
</script>
