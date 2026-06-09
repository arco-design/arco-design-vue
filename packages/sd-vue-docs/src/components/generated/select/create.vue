<template>
  <sd-space direction="vertical" size="large">
    <sd-select class="sd:w-80" placeholder="Please select ..." allow-create :options="options" />
    <sd-select
      class="sd:w-80"
      placeholder="Please select ..."
      multiple
      allow-create
      :options="options"
    />
  </sd-space>
</template>

<script setup lang="ts">
  const options = [
    'Beijing',
    'Shanghai',
    'Guangzhou',
    { label: 'Disabled', disabled: true },
    'Shenzhen',
    'Chengdu',
    'Wuhan',
  ];
</script>
