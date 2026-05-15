<template>
  <sd-space>
    <sd-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </sd-button>
    <sd-button type="primary">
      <template #icon>
        <icon-delete />
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>Delete</template>
    </sd-button>
  </sd-space>
</template>

<script setup lang="ts">
  import { IconPlus, IconDelete } from '@sdata/web-vue/es/icon/index.js';
</script>
