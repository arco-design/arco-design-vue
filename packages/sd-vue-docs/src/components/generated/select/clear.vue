<template>
  <sd-select
    class="sd:w-80"
    v-model="value"
    placeholder="Please select ..."
    allow-clear
    :options="options"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref('Shanghai');
  const options = ['Beijing', 'Shanghai', 'Guangzhou', { label: 'Disabled', disabled: true }];
</script>
