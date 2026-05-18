<template>
  <div class="tw:space-y-4">
    <sd-cropper
      :src="demoImage"
      height="320px"
      :selection-x="selection.x"
      :selection-y="selection.y"
      :selection-width="selection.width"
      :selection-height="selection.height"
      :selection-props="selectionProps"
      @update:selection-x="selection.x = $event"
      @update:selection-y="selection.y = $event"
      @update:selection-width="selection.width = $event"
      @update:selection-height="selection.height = $event"
    />

    <div class="tw:flex tw:flex-wrap tw:gap-3 tw:text-sm tw:text-[var(--sd-color-text-2)]">
      <span>X: {{ Math.round(selection.x) }}</span>
      <span>Y: {{ Math.round(selection.y) }}</span>
      <span>宽: {{ Math.round(selection.width) }}</span>
      <span>高: {{ Math.round(selection.height) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const demoImage =
    "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='400' viewBox='0 0 640 400'%3E%3Crect width='640' height='400' rx='32' fill='%231A1F36'/%3E%3Crect x='64' y='64' width='512' height='192' rx='24' fill='%23F4B740'/%3E%3Crect x='64' y='286' width='340' height='24' rx='12' fill='rgba(255,255,255,0.9)'/%3E%3Crect x='64' y='326' width='236' height='16' rx='8' fill='rgba(255,255,255,0.56)'/%3E%3C/svg%3E";

  const selection = reactive({
    x: 24,
    y: 24,
    width: 160,
    height: 90,
  });

  const selectionProps = {
    movable: true,
    resizable: true,
    keyboard: true,
    outlined: true,
  };
</script>
