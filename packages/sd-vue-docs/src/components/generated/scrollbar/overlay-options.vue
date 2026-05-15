<script setup lang="ts">
  const overlayOptions = {
    update: {
      debounce: {
        event: [10, 20],
      },
    },
    scrollbars: {
      autoHideSuspend: true,
    },
  };

  const scrollbarOptions = {
    autoHide: 'move' as const,
    autoHideDelay: 500,
    dragScroll: true,
  };
</script>

<template>
  <sd-scrollbar
    class="sd:h-55 sd:overflow-auto"
    :padding-absolute="true"
    :overflow="{ x: 'scroll', y: 'scroll' }"
    :update-options="overlayOptions.update"
    :scrollbars="scrollbarOptions"
    :overlay-options="overlayOptions"
  >
    <div
      class="sd:w-300 sd:h-130 sd:p-5 sd:bg-[linear-gradient(135deg, var(--color-fill-2), var(--color-primary-light-1))]"
      >通过组件 props 直接配置 OverlayScrollbars。</div
    >
  </sd-scrollbar>
</template>
