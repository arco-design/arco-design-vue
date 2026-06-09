<template>
  <sd-space direction="vertical" size="large">
    <sd-select class="sd:w-80" placeholder="Please select ..." :options="cityOptions" />
    <sd-select class="sd:w-80" placeholder="Please select ..." :options="boolOptions" />
    <sd-select
      defaultValue="Beijing"
      class="sd:w-80"
      placeholder="Please select ..."
      disabled
      :options="cityOptions"
    />
    <sd-select v-model="value" class="sd:w-80" placeholder="Please select ..." :options="data" />
    <div>Select Value: {{ value }}</div>
    <sd-select
      class="sd:w-40"
      placeholder="Select"
      :trigger-props="{ autoFitPopupMinWidth: true }"
      :options="longOptions"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const cityOptions = ['Beijing', 'Shanghai', 'Guangzhou', { label: 'Disabled', disabled: true }];
  const boolOptions = [
    { value: true, label: '是' },
    { value: false, label: '否' },
  ];
  const longOptions = [
    'Beijing-Beijing-Beijing',
    'Shanghai',
    'Guangzhou',
    { label: 'Disabled', disabled: true },
  ];

  const value = ref();
  const data = [
    {
      value: 'beijing',
      label: 'Beijing',
      other: 'extra',
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      other: 'extra',
    },
    {
      value: 'guangzhou',
      label: 'Guangzhou',
      other: 'extra',
    },
    {
      value: 'chengdu',
      label: 'Chengdu',
      other: 'extra',
    },
  ];
</script>
