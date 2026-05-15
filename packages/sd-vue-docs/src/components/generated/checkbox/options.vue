<template>
  <sd-space direction="vertical" size="large">
    <sd-checkbox-group v-model="value1" :options="plainOptions" />
    <sd-checkbox-group v-model="value2" :options="options" />
    <sd-checkbox-group v-model="value2" :options="options">
      <template #label="{ data }">
        <sd-tag>{{ data.label }}</sd-tag>
      </template>
    </sd-checkbox-group>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const value1 = ref(['Plain 1']);
  const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3'];

  const value2 = ref(['1']);
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3', disabled: true },
  ];
</script>
