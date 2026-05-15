<template>
  <sd-space direction="vertical" size="large">
    <sd-checkbox-group :max="2" v-model="value1" :options="plainOptions" />
    <sd-checkbox-group :max="2" :default-value="['1']">
      <sd-checkbox value="1" disabled>Option 1</sd-checkbox>
      <sd-checkbox value="2">Option 2</sd-checkbox>
      <sd-checkbox value="3">Option 3</sd-checkbox>
      <sd-checkbox value="4">Option 4</sd-checkbox>
    </sd-checkbox-group>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const value1 = ref(['Plain 1']);
  const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3', 'Plain 4'];
</script>
