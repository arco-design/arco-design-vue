<script setup lang="ts">
  const wrapperStyle = {
    height: '220px',
    overflow: 'auto',
  };

  const contentStyle = {
    width: '1200px',
    height: '520px',
    padding: '20px',
    background: 'linear-gradient(135deg, var(--color-fill-2), var(--color-primary-light-1))',
  };

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
    :style="wrapperStyle"
    :padding-absolute="true"
    :overflow="{ x: 'scroll', y: 'scroll' }"
    :update-options="overlayOptions.update"
    :scrollbars="scrollbarOptions"
    :overlay-options="overlayOptions"
  >
    <div :style="contentStyle">通过组件 props 直接配置 OverlayScrollbars。</div>
  </sd-scrollbar>
</template>
