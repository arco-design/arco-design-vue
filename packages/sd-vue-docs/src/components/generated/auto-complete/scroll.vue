<template>
  <sd-auto-complete
    :data="data"
    class="sd:w-90"
    placeholder="please enter something"
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const data = ref([...Array(100)].map((_, index) => `option-${index}`));

  const handleScroll = (ev) => {
    console.log('scroll', ev);
  };
  const handleReachBottom = (ev) => {
    console.log('reach the bottom', ev);
  };
</script>
