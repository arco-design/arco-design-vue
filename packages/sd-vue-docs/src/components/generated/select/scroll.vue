<template>
  <sd-select
    class="sd:w-80"
    default-value="Beijing"
    placeholder="Please select ..."
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
  >
    <sd-option>Beijing</sd-option>
    <sd-option>Shanghai</sd-option>
    <sd-option>Guangzhou</sd-option>
    <sd-option disabled>Disabled</sd-option>
    <sd-option>Shenzhen</sd-option>
    <sd-option>Chengdu</sd-option>
    <sd-option>Wuhan</sd-option>
  </sd-select>
</template>

<script setup lang="ts">
  import type { Size } from '@sdata/web-vue';

  const handleScroll = (ev: Event) => {
    console.log('scroll', ev);
  };
  const handleReachBottom = (ev: Event) => {
    console.log('reach the bottom', ev);
  };
</script>
