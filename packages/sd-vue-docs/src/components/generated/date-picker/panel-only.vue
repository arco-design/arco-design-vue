<template>
  <div>
    <sd-date-picker
      default-value="2019-06-03"
      v-model:pickerValue="pickerValue"
      hide-trigger
      class="sd:w-67"
    />
    <sd-range-picker
      :default-value="['2019-08-01', '2020-06-01']"
      v-model:pickerValue="rangePickerValue"
      hide-trigger
      class="sd:w-140 sd:mt-5"
    />
  </div>
</template>
<script setup lang="ts">
  import { shallowRef } from 'vue';

  const pickerValue = shallowRef(null);

  const rangePickerValue = shallowRef(null);
</script>
