<template>
  <sd-space>
    <sd-date-picker v-model="value" class="sd:w-50" />
    <sd-range-picker v-model="rangeValue" class="sd:w-75" />
  </sd-space>
</template>
<script setup lang="ts">
  import type {
    DatePickerChangeHandler,
    DisabledDate,
    DisabledTime,
    DisabledTimeProps,
    FormatFunc,
    RangeDisabledTime,
  } from '@sdata/web-vue';

  import { ref, shallowRef } from 'vue';

  const value = shallowRef('2026-04-16');

  const rangeValue = ref(['2026-04-16', '2026-04-16']);
</script>
