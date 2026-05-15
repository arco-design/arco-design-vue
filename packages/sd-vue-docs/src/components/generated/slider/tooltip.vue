<template>
  <sd-slider :min="0" :max="50" class="sd:w-50" :format-tooltip="formatter" />
</template>

<script setup lang="ts">
  import type { SliderFormatTooltip } from '@sdata/web-vue';

  const formatter: SliderFormatTooltip = (value) => {
    return `${Math.round((value / 50) * 100)}%`;
  };
</script>
