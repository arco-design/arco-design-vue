<template>
  <sd-space direction="vertical">
    <sd-switch v-model="triggerProps.popupVisible">
      <template #checked> ON </template>
      <template #unchecked>OFF</template>
    </sd-switch>
    <sd-color-picker defaultValue="#165DFF" :trigger-props="triggerProps" />
  </sd-space>
</template>

<script setup>
  import { ref } from 'vue';

  const triggerProps = ref({
    popupVisible: false,
    unmountOnClose: true,
    position: 'bl',
  });
</script>
