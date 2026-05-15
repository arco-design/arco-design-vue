<template>
  <sd-input-number
    placeholder="Please Enter"
    class="input-demo sd:w-80"
    :default-value="12000"
    :min="0"
    :formatter="formatter"
    :parser="parser"
  />
</template>

<script setup lang="ts">
  import type { InputNumberFormatter, InputNumberParser } from '@sdata/web-vue';

  const formatter: InputNumberFormatter = (value) => {
    const normalizedValue = String(value ?? '');
    const values = normalizedValue.split('.');
    values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return values.join('.');
  };

  const parser: InputNumberParser = (value) => {
    return value.replace(/,/g, '');
  };
</script>
