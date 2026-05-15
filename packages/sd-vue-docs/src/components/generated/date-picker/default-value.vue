<template>
  <sd-date-picker
    defaultValue="2019-06-03"
    @select="onSelect"
    @change="onChange"
    class="sd:w-50 sd:mr-6 sd:mb-6"
  />
  <sd-date-picker
    defaultValue="2019-06-03"
    :format="(value) => `custom format: ${dayjs(value).format('YYYY-MM-DD')}`"
    @select="onSelect"
    @change="onChange"
    class="sd:w-60 sd:mr-6 sd:mb-6"
  />
  <sd-date-picker
    showTime
    defaultValue="2019-06-03 08:00:00"
    @select="onSelect"
    @change="onChange"
    class="sd:w-50 sd:mr-6 sd:mb-6"
  />
  <sd-year-picker
    defaultValue="2019"
    @select="onSelect"
    @change="onChange"
    class="sd:w-50 sd:mr-6 sd:mb-6"
  />
  <sd-month-picker
    defaultValue="2019-06"
    @select="onSelect"
    @change="onChange"
    class="sd:w-50 sd:mr-6 sd:mb-6"
  />
  <sd-week-picker
    :defaultValue="dayjs('2019-08-02')"
    @select="onSelect"
    @change="onChange"
    class="sd:w-50 sd:mr-6 sd:mb-6"
  />
  <sd-range-picker
    showTime
    :defaultValue="['2019-08-08 00:00:00', '2019-08-18 00:00:00']"
    @select="onSelect"
    @change="onChange"
    class="sd:w-90 sd:mr-6 sd:mb-6"
  />
  <sd-range-picker
    mode="month"
    :defaultValue="['2019-08', '2020-06']"
    @select="onSelect"
    @change="onChange"
    class="sd:w-75 sd:mb-6"
  />
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';

  function onSelect(dateString: unknown, date: unknown) {
    console.log('onSelect', dateString, date);
  }

  function onChange(dateString: unknown, date: unknown) {
    console.log('onChange: ', dateString, date);
  }
</script>
