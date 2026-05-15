<template>
  <sd-space>
    <sd-button type="primary">Square</sd-button>
    <sd-button type="primary" shape="round">Round</sd-button>
    <sd-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </sd-button>
    <sd-button type="primary" shape="circle">
      <icon-plus />
    </sd-button>
  </sd-space>
</template>
<script setup lang="ts">
  import { IconPlus } from '@sdata/web-vue/es/icon/index.js';
</script>
