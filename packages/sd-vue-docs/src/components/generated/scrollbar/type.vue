<template>
  <sd-scrollbar class="sd:h-50 sd:overflow-auto">
    <div
      class="sd:w-500 sd:h-500"
      :style="{ backgroundColor: `var(${getCssVarToken('--color-primary-light-4')})` }"
      >Content</div
    >
  </sd-scrollbar>
</template>

<script setup>
  import { getCssVarToken } from '@sdata/web-vue';
</script>
