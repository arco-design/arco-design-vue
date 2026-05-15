<template>
  <sd-space size="large" class="sd:w-full">
    <sd-progress size="mini" :percent="percent" />
    <sd-progress size="mini" status="warning" :percent="percent" />
    <sd-progress size="mini" status="danger" :percent="percent" />
    <sd-progress size="mini" status="success" :percent="percent" />
  </sd-space>
  <sd-space size="large" class="sd:w-full sd:mt-5">
    <sd-progress type="circle" size="mini" :percent="percent" />
    <sd-progress type="circle" size="mini" status="warning" :percent="percent" />
    <sd-progress type="circle" size="mini" status="danger" :percent="percent" />
    <sd-progress type="circle" size="mini" status="success" :percent="percent" />
  </sd-space>
  <div class="sd:mt-5">
    <sd-slider v-model="percent" :max="1" :step="0.1" class="sd:w-37.5" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const percent = ref(0.2);
</script>
