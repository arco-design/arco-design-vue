<script setup lang="ts">
  import { ref } from 'vue';

  const visible = ref(false);
</script>

<template>
  <sd-space direction="vertical" fill>
    <sd-button type="outline" size="small" @click="visible = !visible">
      {{ visible ? '切换为隐藏' : '切换为显示' }}
    </sd-button>
    <sd-secret v-model:visible="visible" text="db-password-prod-2026" />
  </sd-space>
</template>
