<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group v-model="position" type="button">
      <sd-radio value="top">Top</sd-radio>
      <sd-radio value="right">Right</sd-radio>
      <sd-radio value="bottom">Bottom</sd-radio>
      <sd-radio value="left">Left</sd-radio>
    </sd-radio-group>
    <sd-tabs :position="position">
      <sd-tab-pane key="1" title="Tab 1"> Content of Tab Panel 1 </sd-tab-pane>
      <sd-tab-pane key="2" title="Tab 2"> Content of Tab Panel 2 </sd-tab-pane>
      <sd-tab-pane key="3" title="Tab 3"> Content of Tab Panel 3 </sd-tab-pane>
    </sd-tabs>
  </sd-space>
</template>

<script setup lang="ts">
  import type { ScrollPosition, TabTriggerEvent, TabsPosition, TabsType } from '@sdata/web-vue';

  import { ref } from 'vue';

  const position = ref<TabsPosition>('top');
</script>
