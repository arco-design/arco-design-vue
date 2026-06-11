<template>
  <article :class="classNames"><slot /></article>
</template>

<script setup lang="ts">
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'Typography' });

  const prefixCls = getPrefixCls('typography');

  const classNames = [prefixCls];
</script>
