<template>
  <sd-time-picker class="sd:w-48.5" v-model="value" />
</template>
<script setup lang="ts">
  import { shallowRef } from 'vue';

  const value = shallowRef(null);
</script>
