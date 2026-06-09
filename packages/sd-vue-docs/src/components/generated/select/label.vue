<template>
  <sd-space direction="vertical" size="large">
    <sd-select class="sd:w-80" placeholder="Please select ..." :options="options">
      <template #label="{ data }">
        <span><icon-plus />{{ data?.label }}</span>
      </template>
    </sd-select>
  </sd-space>
</template>

<script setup lang="ts">
  import { IconPlus } from '@sdata/web-vue/es/icon/index.js';

  const options = ['Beijing', 'Shanghai', 'Guangzhou', { label: 'Disabled', disabled: true }];
</script>
