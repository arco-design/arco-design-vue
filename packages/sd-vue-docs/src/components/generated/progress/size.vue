<template>
  <sd-space direction="vertical" size="large" class="sd:w-[50%]">
    <sd-radio-group v-model="size" type="button">
      <sd-radio value="small">Small</sd-radio>
      <sd-radio value="medium">Medium</sd-radio>
      <sd-radio value="large">Large</sd-radio>
    </sd-radio-group>
    <sd-progress :size="size" :percent="0.2" />
    <sd-progress status="warning" :size="size" :percent="0.2" />
    <sd-progress status="danger" :size="size" :percent="0.2" />
    <sd-space>
      <sd-progress type="circle" :size="size" :percent="0.2" />
      <sd-progress type="circle" status="warning" :size="size" :percent="0.2" />
      <sd-progress type="circle" status="danger" :size="size" :percent="0.2" />
    </sd-space>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const size = ref<'small' | 'medium' | 'large'>('medium');
</script>
