<template>
  <div>
    <sd-date-picker
      class="sd:w-50 sd:mr-6 sd:mb-6"
      :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
    />
    <sd-range-picker
      class="sd:w-90 sd:mr-6 sd:mb-6"
      :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
    />
    <sd-date-picker
      class="sd:w-50 sd:mr-6 sd:mb-6"
      show-time
      :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
      :disabledTime="getDisabledTime"
    />
    <sd-range-picker
      class="sd:w-90 sd:mb-6"
      show-time
      :timePickerProps="{ hideDisabledOptions: true }"
      :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
      :disabledTime="getDisabledRangeTime"
    />
  </div>
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function getDisabledTime(date) {
    return {
      disabledHours: () => range(6, 24),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => range(30, 60),
    };
  }

  function getDisabledRangeTime(date, type) {
    return {
      disabledHours: () => (type === 'start' ? range(0, 6) : range(6, 24)),
      disabledMinutes: () => (type === 'end' ? range(0, 30) : [31, 60]),
      disabledSeconds: () => range(30, 60),
    };
  }
</script>
