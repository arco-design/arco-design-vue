<template>
  <div :class="prefixCls">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'InputGroup' });

  const prefixCls = getPrefixCls('input-group');
</script>
