<template>
  <sd-range-picker
    class="sd:w-75"
    @select="onSelect"
    @popupVisibleChange="onPopupVisibleChange"
    :disabledDate="disabledDate"
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

  import { shallowRef } from 'vue';

  type RangeDateLike = Date | number | string;

  const dates = shallowRef<RangeDateLike[]>([]);

  function getDayDistance(current: RangeDateLike, target: RangeDateLike) {
    return Math.abs(
      (new Date(current).getTime() - new Date(target).getTime()) / (24 * 60 * 60 * 1000),
    );
  }

  function onSelect(value: (RangeDateLike | undefined)[], _date: unknown, _dateString: unknown) {
    dates.value = value.filter((item): item is RangeDateLike => item !== undefined);
  }

  function onPopupVisibleChange(visible: boolean) {
    if (!visible) {
      dates.value = [];
    }
  }

  function disabledDate(current: RangeDateLike) {
    const selectedDates = dates.value;
    if (selectedDates.length === 0) {
      return false;
    }

    const tooLate = selectedDates[0] ? getDayDistance(current, selectedDates[0]) > 7 : false;
    const tooEarly = selectedDates[1] ? getDayDistance(current, selectedDates[1]) > 7 : false;

    return tooEarly || tooLate;
  }
</script>
