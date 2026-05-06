<template>
  <sd-space direction="vertical" :size="16">
    <sd-color-picker
      v-model="gradient"
      :color-modes="['monochrome', 'linear-gradient']"
      :recent-colors="recentColors"
      enable-alpha
      @recent-colors-change="updateRecentColors"
    />
    <sd-color-picker
      v-model="gradientOnly"
      :color-modes="['linear-gradient']"
      :swatch-colors="gradientSwatches"
      hide-trigger
    />
  </sd-space>
</template>

<script setup>
  import { ref } from 'vue';

  const gradient = ref(
    'linear-gradient(90deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
  );
  const gradientOnly = ref(
    'linear-gradient(135deg, rgba(255, 126, 95, 1) 0%, rgba(254, 180, 123, 1) 100%)',
  );
  const recentColors = ref([
    'linear-gradient(90deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
  ]);
  const gradientSwatches = [
    'linear-gradient(90deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)',
    'linear-gradient(135deg, rgba(255, 126, 95, 1) 0%, rgba(254, 180, 123, 1) 100%)',
    'linear-gradient(120deg, rgba(67, 233, 123, 1) 0%, rgba(56, 249, 215, 1) 100%)',
  ];

  const updateRecentColors = (value) => {
    recentColors.value = value;
  };
</script>
