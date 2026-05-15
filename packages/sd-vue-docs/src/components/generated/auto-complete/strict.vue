<template>
  <sd-auto-complete :data="data" class="sd:w-90" placeholder="please enter something" strict />
</template>

<script setup lang="ts">
  import type {
    AutoCompleteData,
    AutoCompleteDropdownReachBottomHandler,
    AutoCompleteDropdownScrollHandler,
    AutoCompleteSearchHandler,
  } from '@sdata/web-vue';

  import { ref } from 'vue';

  const data = ref(['Beijing', 'Shanghai', 'Chengdu', 'WuHan']);
</script>
