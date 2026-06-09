<template>
  <sd-space direction="vertical" size="large">
    <sd-select class="sd:w-80" placeholder="Please select ..." :options="groupOptions" />
    <sd-select class="sd:w-80" placeholder="Please select ..." multiple :options="groupOptions" />
  </sd-space>
</template>

<script setup lang="ts">
  const groupOptions = [
    {
      isGroup: true,
      label: 'Group-1',
      options: ['Beijing', 'Shanghai'],
    },
    {
      isGroup: true,
      label: 'Group-2',
      options: ['Guangzhou', { label: 'Disabled', disabled: true }, 'Shenzhen'],
    },
    {
      isGroup: true,
      label: 'Group-3',
      options: ['Chengdu', 'Wuhan'],
    },
  ];
</script>
