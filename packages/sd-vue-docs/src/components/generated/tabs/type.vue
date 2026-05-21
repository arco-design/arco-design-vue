<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group v-model="type" type="button">
      <sd-radio value="line">Line</sd-radio>
      <sd-radio value="card">Card</sd-radio>
      <sd-radio value="card-gutter">Card Gutter</sd-radio>
      <sd-radio value="text">Text</sd-radio>
      <sd-radio value="rounded">Rounded</sd-radio>
      <sd-radio value="capsule">Capsule</sd-radio>
    </sd-radio-group>
    <sd-radio-group v-model="size" type="button">
      <sd-radio value="mini">Mini</sd-radio>
      <sd-radio value="small">Small</sd-radio>
      <sd-radio value="medium">Medium</sd-radio>
      <sd-radio value="large">Large</sd-radio>
    </sd-radio-group>
    <sd-tabs :type="type" :size="size">
      <sd-tab-pane key="1" title="Tab 1"> Content of Tab Panel 1 </sd-tab-pane>
      <sd-tab-pane key="2" title="Tab 2"> Content of Tab Panel 2 </sd-tab-pane>
      <sd-tab-pane key="3" title="Tab 3"> Content of Tab Panel 3 </sd-tab-pane>
    </sd-tabs>
  </sd-space>
</template>

<script setup lang="ts">
  import type { TabsType } from '@sdata/web-vue';

  import { ref } from 'vue';

  const type = ref<TabsType>('line');
  const size = ref<'mini' | 'small' | 'medium' | 'large'>('medium');
</script>
