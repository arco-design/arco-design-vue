<template>
  <sd-space :size="40">
    <sd-badge :count="9" dot :offset="[6, -2]">
      <a href="#">Link</a>
    </sd-badge>
    <sd-badge :count="9" dot :offset="[2, -2]">
      <IconNotification class="sd:text-[#888] sd:text-lg sd:align-[-3px]" />
    </sd-badge>
  </sd-space>
</template>

<script setup lang="ts">
  import { IconNotification } from '@sdata/web-vue/es/icon/index.js';
</script>
