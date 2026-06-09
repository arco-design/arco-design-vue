<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group type="button" v-model="size">
      <sd-radio value="mini">Mini</sd-radio>
      <sd-radio value="small">Small</sd-radio>
      <sd-radio value="medium">Medium</sd-radio>
      <sd-radio value="large">Large</sd-radio>
    </sd-radio-group>
    <sd-select
      default-value="Beijing"
      class="sd:w-80"
      :size="size"
      placeholder="Please select ..."
      :options="options"
    />
    <sd-select
      :default-value="['Beijing', 'Shanghai']"
      class="sd:w-80"
      :size="size"
      placeholder="Please select ..."
      multiple
      :options="allOptions"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import type { Size } from '@sdata/web-vue';

  import { ref } from 'vue';

  const size = ref<Size>('medium');
  const options = ['Beijing', 'Shanghai', 'Guangzhou', { label: 'Disabled', disabled: true }];
  const allOptions = [
    'Beijing',
    'Shanghai',
    'Guangzhou',
    { label: 'Disabled', disabled: true },
    'Shenzhen',
    'Chengdu',
    'Wuhan',
  ];
</script>
