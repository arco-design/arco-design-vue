<template>
  <sd-slider :min="0" :max="50" class="sd:w-50" :format-tooltip="formatter" />
</template>

<script setup lang="ts">
  const formatter = (value) => {
    return `${Math.round((value / 50) * 100)}%`;
  };
</script>
