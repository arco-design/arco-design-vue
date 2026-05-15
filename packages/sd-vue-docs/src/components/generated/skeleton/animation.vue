<template>
  <sd-space direction="vertical" size="large" class="sd:w-full">
    <sd-space>
      <span>Animation</span>
      <sd-switch v-model="animation" />
    </sd-space>
    <sd-skeleton :animation="animation">
      <sd-space direction="vertical" class="sd:w-full" size="large">
        <sd-skeleton-line :rows="3" />
        <sd-skeleton-shape />
      </sd-space>
    </sd-skeleton>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const animation = ref(true);
</script>
