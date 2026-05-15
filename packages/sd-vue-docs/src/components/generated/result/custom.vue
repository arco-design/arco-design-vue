<template>
  <sd-result :status="null" title="This is title content" subtitle="This is subtitle content">
    <template #icon>
      <IconFaceSmileFill />
    </template>
    <template #extra>
      <sd-space>
        <sd-button type="secondary">Again</sd-button>
        <sd-button type="primary">Back</sd-button>
      </sd-space>
    </template>
  </sd-result>
</template>
<script setup lang="ts">
  import { IconFaceSmileFill } from '@sdata/web-vue/es/icon/index.js';
</script>
