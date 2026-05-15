<template>
  <sd-date-picker defaultValue="2020-08-08" disabled class="sd:w-50 sd:mb-5" />
  <br />
  <sd-range-picker :defaultValue="['2020-08-08', '2020-08-18']" disabled class="sd:w-75 sd:mb-5" />
  <br />
  <sd-range-picker
    :defaultValue="['2020-08-08']"
    :disabled="[true, false]"
    :disabledDate="disableBeforePresetDate"
    class="sd:mb-5 sd:w-75"
  />
  <br />
  <sd-range-picker
    showTime
    :defaultValue="['2020-08-08 02:02:02']"
    :disabled="[true, false]"
    class="sd:w-95"
  />
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

  import dayjs from 'dayjs';

  const disableBeforePresetDate: DisabledDate = (current) =>
    dayjs(current).isBefore(dayjs('2020-08-08'));
</script>
