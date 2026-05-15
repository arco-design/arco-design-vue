<template>
  <sd-time-picker format="HH:mm" :defaultValue="defaultValue" class="sd:w-32.5" />
</template>
<script setup lang="ts">
  import { shallowRef } from 'vue';

  const defaultValue = shallowRef('09:24');
</script>
