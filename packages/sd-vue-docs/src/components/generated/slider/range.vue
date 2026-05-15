<template>
  <sd-slider v-model="value" class="sd:w-75" range />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref([5, 10]);
</script>
