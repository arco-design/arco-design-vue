<template>
  <sd-space size="large">
    <sd-progress type="circle" :percent="percent" />
    <sd-progress type="circle" status="warning" :percent="percent" />
    <sd-progress type="circle" status="danger" :percent="percent" />
    <sd-progress type="circle" status="success" :percent="percent" />
  </sd-space>
  <div class="sd:mt-5">
    <sd-slider v-model="percent" :max="1" :step="0.1" class="sd:w-37.5" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const percent = ref(0.2);
</script>
