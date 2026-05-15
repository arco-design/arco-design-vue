<template>
  <div>
    <sd-date-picker class="sd:w-50 sd:mr-6 sd:mb-6" :disabledDate="disablePastDate" />
    <sd-range-picker class="sd:w-90 sd:mr-6 sd:mb-6" :disabledDate="disablePastDate" />
    <sd-date-picker
      class="sd:w-50 sd:mr-6 sd:mb-6"
      show-time
      :disabledDate="disablePastDate"
      :disabledTime="getDisabledTime"
    />
    <sd-range-picker
      class="sd:w-90 sd:mb-6"
      show-time
      :timePickerProps="{ hideDisabledOptions: true }"
      :disabledDate="disablePastDate"
      :disabledTime="getDisabledRangeTime"
    />
  </div>
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

  function range(start: number, end: number) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function getDisabledTime(date: Date): DisabledTimeProps {
    return {
      disabledHours: () => range(6, 24),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => range(30, 60),
    };
  }

  function getDisabledRangeTime(date: Date, type: 'start' | 'end'): DisabledTimeProps {
    return {
      disabledHours: () => (type === 'start' ? range(0, 6) : range(6, 24)),
      disabledMinutes: () => (type === 'end' ? range(0, 30) : [31, 60]),
      disabledSeconds: () => range(30, 60),
    };
  }

  const disablePastDate = (current?: Date) => (current ? dayjs(current).isBefore(dayjs()) : false);
</script>
