<template>
  <sd-date-picker>
    <template #cell="{ date }">
      <div class="sd:picker-date">
        <div class="sd:picker-date-value" :class="getCellClass(date)">
          {{ date.getDate() }}
        </div>
      </div>
    </template>
  </sd-date-picker>
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

  const highlightDates = [6, 14, 22];
  const highlightClass = 'sd:border sd:border-[rgb(var(--sdblue-6))]';

  function getCellClass(date: Date) {
    return highlightDates.includes(date.getDate()) ? highlightClass : undefined;
  }
</script>
