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
  import type {
    AutoCompleteData,
    AutoCompleteDropdownReachBottomHandler,
    AutoCompleteDropdownScrollHandler,
    AutoCompleteSearchHandler,
  } from '@sdata/web-vue';

  import { ref } from 'vue';

  const data = ref([...Array(100)].map((_, index) => `option-${index}`));

  const handleScroll: AutoCompleteDropdownScrollHandler = (ev) => {
    console.log('scroll', ev);
  };
  const handleReachBottom: AutoCompleteDropdownReachBottomHandler = (ev) => {
    console.log('reach the bottom', ev);
  };
</script>
