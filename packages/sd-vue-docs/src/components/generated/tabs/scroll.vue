<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group v-model="position" type="button">
      <sd-radio value="left">Left</sd-radio>
      <sd-radio value="top">Top</sd-radio>
      <sd-radio value="right">Right</sd-radio>
      <sd-radio value="bottom">Bottom</sd-radio>
    </sd-radio-group>
    <sd-radio-group v-model="scrollPosition" type="button">
      <sd-radio value="auto">auto</sd-radio>
      <sd-radio value="start">start</sd-radio>
      <sd-radio value="center">center</sd-radio>
      <sd-radio value="end">end</sd-radio>
    </sd-radio-group>
    <sd-button @click="changeActive"> Change: {{ activeKey }}</sd-button>
  </sd-space>
  <sd-tabs
    v-model:activeKey="activeKey"
    :position="position"
    :scrollPosition="scrollPosition"
    class="sd:w-full sd:h-75 sd:mt-5"
  >
    <sd-tab-pane v-for="tab in tabs" :key="tab.key" :title="tab.title">
      {{ tab.content }}
    </sd-tab-pane>
  </sd-tabs>
</template>

<script setup lang="ts">
  import type { ScrollPosition, TabsPosition } from '@sdata/web-vue';

  import { ref } from 'vue';

  const position = ref<TabsPosition>('top');
  const scrollPosition = ref<ScrollPosition>('auto');
  const activeKey = ref('Tab1');
  const tabs = Array.from({ length: 30 }, (v, i) => {
    return {
      key: `Tab${i + 1}`,
      title: `Tab ${i + 1}`,
      content: `Content of Tab Panel ${i + 1}`,
    };
  });

  const changeActive = () => {
    activeKey.value = `Tab${Math.floor(Math.random() * 30) + 1}`;
  };
</script>
