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
  const handleScroll = (ev) => {
    console.log('scroll', ev);
  };
  const handleReachBottom = (ev) => {
    console.log('reach the bottom', ev);
  };
</script>
