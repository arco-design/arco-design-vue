<template>
  <sd-space>
    <sd-link href="#" icon icon-tooltip="查看详情" />

    <sd-link href="#" icon-tooltip="编辑内容">
      <template #icon>
        <icon-edit />
      </template>
    </sd-link>
  </sd-space>
</template>

<script setup lang="ts">
  import { IconEdit } from '@sdata/web-vue/es/icon/index.js';
</script>
