<template>
  <sd-space direction="vertical" size="large">
    <sd-select
      class="sd:w-full"
      placeholder="Please select ..."
      :bordered="false"
      :options="options"
    />
    <sd-select
      :default-value="['Beijing', 'Shanghai']"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      :bordered="false"
      :options="borderOptions"
    />
  </sd-space>
</template>

<script setup lang="ts">
  const options = ['Beijing', 'Shanghai', 'Guangzhou', { label: 'Disabled', disabled: true }];
  const borderOptions = [
    'Beijing',
    { label: 'Shanghai', tagProps: { color: 'red' } },
    'Guangzhou',
    { label: 'Disabled', disabled: true },
    'Shenzhen',
    'Wuhan',
  ];
</script>
