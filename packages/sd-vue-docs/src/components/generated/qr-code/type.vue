<template>
  <div class="sd:flex sd:flex-wrap sd:gap-6">
    <div class="sd:flex sd:flex-col sd:items-center sd:gap-3">
      <div class="sd:text-sm" :style="{ color: `var(${getCssVarToken('--color-text-2')})` }"
        >Canvas</div
      >
      <sd-qr-code :value="value" type="canvas" />
    </div>
    <div class="sd:flex sd:flex-col sd:items-center sd:gap-3">
      <div class="sd:text-sm" :style="{ color: `var(${getCssVarToken('--color-text-2')})` }"
        >SVG</div
      >
      <sd-qr-code :value="value" type="svg" />
    </div>
  </div>
</template>

<script setup>
  import { getCssVarToken } from '@sdata/web-vue';

  const value = 'https://sd-design.js.org';
</script>
