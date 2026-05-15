<template>
  <sd-slider v-model="value" class="sd:w-75" range />
</template>

<script setup lang="ts">
  import type { SliderValue } from '@sdata/web-vue';

  import { ref } from 'vue';

  const value = ref<SliderValue>([5, 10]);
</script>
