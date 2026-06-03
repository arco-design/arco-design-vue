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

  import {
    type AutoCompleteDropdownReachBottomHandler,
    type AutoCompleteDropdownScrollHandler,
  } from '@sdata/web-vue';

  const data = ref([...Array(100)].map((_, index) => `option-${index}`));

  const handleScroll: AutoCompleteDropdownScrollHandler = (ev) => {
    console.log('滚动', ev);
  };
  const handleReachBottom: AutoCompleteDropdownReachBottomHandler = (ev) => {
    console.log('滚动到底部', ev);
  };
</script>
