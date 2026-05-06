<template>
  <sd-color-picker
    defaultValue="#165DFF"
    :recent-colors="recentColors"
    :swatch-colors="swatchColors"
    @recent-colors-change="updateRecentColors"
  />
</template>

<script setup>
  import { ref } from 'vue';

  const recentColors = ref(['#165DFF', 'rgba(54, 207, 201, 1)']);
  const swatchColors = ['#165DFF', '#0FC6C2', '#00B42A', '#FF7D00', '#F53F3F'];

  const updateRecentColors = (value) => {
    recentColors.value = value;
  };
</script>
