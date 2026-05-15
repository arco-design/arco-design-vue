<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group v-model="size" type="button">
      <sd-radio value="small">Small</sd-radio>
      <sd-radio value="medium">Medium</sd-radio>
      <sd-radio value="large">Large</sd-radio>
    </sd-radio-group>
    <sd-list :size="size">
      <template #header> List title </template>
      <sd-list-item>Beijing Bytedance Technology Co., Ltd.</sd-list-item>
      <sd-list-item>Bytedance Technology Co., Ltd.</sd-list-item>
      <sd-list-item>Beijing Toutiao Technology Co., Ltd.</sd-list-item>
      <sd-list-item>Beijing Volcengine Technology Co., Ltd.</sd-list-item>
      <sd-list-item>China Beijing Bytedance Technology Co., Ltd.</sd-list-item>
    </sd-list>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const size = ref<'small' | 'medium' | 'large'>('medium');
</script>
