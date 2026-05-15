<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group type="button" v-model="size">
      <sd-radio value="mini">Mini</sd-radio>
      <sd-radio value="small">Small</sd-radio>
      <sd-radio value="medium">Medium</sd-radio>
      <sd-radio value="large">Large</sd-radio>
    </sd-radio-group>
    <sd-pagination :total="50" :size="size" show-total show-jumper show-page-size />
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const size = ref<'mini' | 'small' | 'medium' | 'large'>('medium');
</script>
