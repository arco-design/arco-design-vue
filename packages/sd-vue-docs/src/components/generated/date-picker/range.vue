<template>
  <sd-range-picker @change="onChange" @select="onSelect" class="sd:w-63.5 sd:mb-5" />
  <br />
  <sd-range-picker mode="week" @change="onChange" @select="onSelect" class="sd:w-63.5 sd:mb-5" />
  <br />
  <sd-range-picker mode="month" @change="onChange" @select="onSelect" class="sd:w-63.5 sd:mb-5" />
  <br />
  <sd-range-picker mode="year" @change="onChange" @select="onSelect" class="sd:w-63.5 sd:mb-5" />
  <br />
  <sd-range-picker mode="quarter" @change="onChange" @select="onSelect" class="sd:w-63.5 sd:mb-5" />
  <br />
  <sd-range-picker
    showTime
    :time-picker-props="{
      defaultValue: ['00:00:00', '00:00:00'],
    }"
    @change="onChange"
    @select="onSelect"
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

  function onSelect(dateString: unknown, date: unknown) {
    console.log('onSelect', dateString, date);
  }

  function onChange(dateString: unknown, date: unknown) {
    console.log('onChange: ', dateString, date);
  }
</script>
