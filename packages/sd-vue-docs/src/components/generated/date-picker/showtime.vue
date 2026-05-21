<template>
  <sd-date-picker
    class="sd:w-55 sd:mr-6 sd:mb-6"
    show-time
    :time-picker-props="{ defaultValue: '09:09:06' }"
    format="YYYY-MM-DD HH:mm:ss"
    @change="onChange"
    @select="onSelect"
    @ok="onOk"
  />
  <sd-date-picker
    class="sd:w-55 sd:mr-6 sd:mb-6"
    show-time
    format="YYYY-MM-DD hh:mm"
    @change="onChange"
    @select="onSelect"
    @ok="onOk"
  />
  <sd-range-picker
    class="sd:w-90 sd:mr-6 sd:mb-6"
    show-time
    :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
    format="YYYY-MM-DD HH:mm"
    @change="onChange"
    @select="onSelect"
    @ok="onOk"
  />
</template>
<script setup lang="ts">
  function onSelect(dateString: unknown, date: unknown) {
    console.log('onSelect', dateString, date);
  }

  function onChange(dateString: unknown, date: unknown) {
    console.log('onChange: ', dateString, date);
  }

  function onOk(dateString: unknown, date: unknown) {
    console.log('onOk: ', dateString, date);
  }
</script>
