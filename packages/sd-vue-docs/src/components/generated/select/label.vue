<template>
  <sd-select default-value="Beijing" class="sd:w-80" placeholder="Please select ...">
    <template #label="{ data }">
      <span><icon-plus />{{ data?.label }}</span>
    </template>
    <sd-option>Beijing</sd-option>
    <sd-option>Shanghai</sd-option>
    <sd-option>Guangzhou</sd-option>
    <sd-option disabled>Disabled</sd-option>
  </sd-select>
</template>

<script setup lang="ts">
  import type { Size } from '@sdata/web-vue';

  import { IconPlus } from '@sdata/web-vue/es/icon/index.js';
</script>
