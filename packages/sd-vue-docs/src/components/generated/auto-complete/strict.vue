<template>
  <sd-auto-complete :data="data" class="sd:w-90" placeholder="please enter something" strict />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const data = ref(['Beijing', 'Shanghai', 'Chengdu', 'WuHan']);
</script>
