<template>
  <sd-space direction="vertical">
    <sd-rate color="red" />
    <sd-rate :color="color" />
  </sd-space>
</template>

<script setup lang="ts">
  const color = {
    2: 'red',
    4: 'green',
    5: 'blue',
  };
</script>
