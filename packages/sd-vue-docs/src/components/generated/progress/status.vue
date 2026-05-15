<template>
  <sd-space direction="vertical" class="sd:w-[50%]">
    <sd-progress :percent="percent" />
    <sd-progress status="warning" :percent="percent" />
    <sd-progress status="danger" :percent="percent" />
  </sd-space>
  <div class="sd:mt-5">
    <sd-slider v-model="percent" :max="1" :step="0.1" class="sd:w-37.5" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const percent = ref(0.2);
</script>
