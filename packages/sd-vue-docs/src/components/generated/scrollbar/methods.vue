<script setup lang="ts">
  import { ref, shallowRef } from 'vue';

  interface ScrollbarInstance {
    scrollTo: (options?: number | { left?: number; top?: number }, y?: number) => void;
    state: () => { hasOverflow: { x: boolean; y: boolean } } | undefined;
    update: (force?: boolean) => boolean;
  }

  const statusStyle = {
    color: 'var(--color-text-3)',
  };

  const wrapperStyle = {
    height: '220px',
    overflow: 'auto',
  };

  const contentStyle = {
    width: '900px',
    height: '540px',
    padding: '20px',
    background: 'linear-gradient(180deg, var(--color-fill-2), var(--color-secondary-light-1))',
  };

  const scrollbarRef = ref<ScrollbarInstance>();
  const statusText = shallowRef('ready');

  const scrollToCenter = () => {
    scrollbarRef.value?.scrollTo({ top: 180, left: 260 });
    statusText.value = 'scrollTo';
  };

  const syncState = () => {
    const state = scrollbarRef.value?.state();
    if (!state) {
      statusText.value = 'no-instance';
      return;
    }

    statusText.value = `overflow:${Number(state.hasOverflow.x)}/${Number(state.hasOverflow.y)}`;
  };

  const forceUpdate = () => {
    const changed = scrollbarRef.value?.update(true) ?? false;
    statusText.value = changed ? 'updated' : 'no-change';
  };
</script>

<template>
  <sd-space direction="vertical" fill>
    <sd-space>
      <sd-button size="small" @click="scrollToCenter">scrollTo</sd-button>
      <sd-button size="small" @click="syncState">state</sd-button>
      <sd-button size="small" @click="forceUpdate">update</sd-button>
    </sd-space>

    <div :style="statusStyle">status: {{ statusText }}</div>

    <sd-scrollbar ref="scrollbarRef" :style="wrapperStyle">
      <div :style="contentStyle"> 通过 ref 调用底层 OverlayScrollbars 方法。 </div>
    </sd-scrollbar>
  </sd-space>
</template>
