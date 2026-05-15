<template>
  <sd-space direction="vertical" size="large">
    <sd-select
      defaultValue="Shanxi"
      class="sd:w-80"
      placeholder="Please select ..."
      :fallback-option="fallback"
    >
      <sd-option>Beijing</sd-option>
      <sd-option>Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
    </sd-select>
    <sd-select
      defaultValue="Shanxi"
      class="sd:w-80"
      placeholder="Please select ..."
      :fallback-option="fallback"
      :show-extra-options="false"
    >
      <sd-option>Beijing</sd-option>
      <sd-option>Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
    </sd-select>
    <sd-select
      :default-value="['Shanxi', 'Nanjing', 'Hangzhou']"
      class="sd:w-80"
      placeholder="Please select ..."
      multiple
      :fallback-option="fallback"
    >
      <sd-option>Beijing</sd-option>
      <sd-option>Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
      <sd-option>Shenzhen</sd-option>
      <sd-option>Chengdu</sd-option>
      <sd-option>Wuhan</sd-option>
    </sd-select>
  </sd-space>
</template>

<script setup lang="ts">
  import type { SelectFallbackOption } from '@sdata/web-vue';

  const fallback: SelectFallbackOption = (value) => {
    return {
      value,
      label: `++${value}++`,
    };
  };
</script>
