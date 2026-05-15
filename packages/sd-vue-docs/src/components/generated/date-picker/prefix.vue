<template>
  <div>
    <div>
      <sd-date-picker class="sd:w-75">
        <template #prefix>
          <IconInfoCircle />
        </template>
      </sd-date-picker>
    </div>
    <sd-range-picker
      showTime
      :defaultValue="['2019-08-08 00:00:00', '2019-08-18 00:00:00']"
      @select="onSelect"
      @change="onChange"
      class="sd:mt-5 sd:w-100"
    >
      <template #prefix>
        <IconInfoCircle />
      </template>
    </sd-range-picker>
  </div>
</template>

<script setup lang="ts">
  import { IconInfoCircle } from '@sdata/web-vue/es/icon/index.js';

  function onSelect(dateString: unknown, date: unknown) {
    console.log('onSelect', dateString, date);
  }

  function onChange(dateString: unknown, date: unknown) {
    console.log('onChange: ', dateString, date);
  }
</script>
