<template>
  <sd-calendar v-model="value" />
  select: {{ value }}
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref(new Date('2023-01-01'));
</script>
