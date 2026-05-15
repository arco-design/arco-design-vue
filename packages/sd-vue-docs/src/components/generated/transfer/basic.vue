<template>
  <sd-transfer :data="data" :default-value="value" />
</template>

<script setup lang="ts">
  const data = Array(8)
    .fill(undefined)
    .map((_, index) => ({
      value: `option${index + 1}`,
      label: `Option ${index + 1}`,
    }));
  const value = ['option1', 'option3', 'option5'];
</script>
