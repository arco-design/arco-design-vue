<template>
  <sd-select
    class="sd:w-80"
    default-value="Beijing"
    placeholder="Please select ..."
    :options="options"
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
  />
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

  const handleScroll = (ev: Event) => {
    console.log('滚动', ev);
  };
  const handleReachBottom = (ev: Event) => {
    console.log('滚动到底部', ev);
  };
</script>
