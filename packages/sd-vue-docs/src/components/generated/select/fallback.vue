<template>
  <sd-space direction="vertical" size="large">
    <sd-select
      defaultValue="Shanxi"
      class="sd:w-80"
      placeholder="Please select ..."
      :fallback-option="fallback"
      :options="options"
    />
    <sd-select
      defaultValue="Shanxi"
      class="sd:w-80"
      placeholder="Please select ..."
      :fallback-option="fallback"
      :show-extra-options="false"
      :options="options"
    />
    <sd-select
      :default-value="['Shanxi', 'Nanjing', 'Hangzhou']"
      class="sd:w-80"
      placeholder="Please select ..."
      multiple
      :fallback-option="fallback"
      :options="allOptions"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import type { SelectFallbackOption } from '@sdata/web-vue';

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

  const fallback: SelectFallbackOption = (value) => {
    return {
      value,
      label: `++${value}++`,
    };
  };
</script>
