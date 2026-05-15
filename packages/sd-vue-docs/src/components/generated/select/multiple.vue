<template>
  <div class="sd:mb-2.5">
    <sd-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <sd-space direction="vertical" size="large">
    <sd-select
      :default-value="['Beijing', 'Shanghai']"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      :scrollbar="scrollbar"
    >
      <sd-option>Beijing</sd-option>
      <sd-option :tag-props="{ color: 'red' }">Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
      <sd-option>Shenzhen</sd-option>
      <sd-option>Wuhan</sd-option>
    </sd-select>
    <sd-select
      :default-value="['Beijing', 'Shanghai', 'Guangzhou']"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      :max-tag-count="2"
      allow-clear
      :scrollbar="scrollbar"
    >
      <sd-option>Beijing</sd-option>
      <sd-option>Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
      <sd-option>Shenzhen</sd-option>
      <sd-option>Chengdu</sd-option>
      <sd-option>Wuhan</sd-option>
    </sd-select>
    <sd-select
      :default-value="['Beijing', 'Shanghai']"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      :limit="2"
      :scrollbar="scrollbar"
    >
      <sd-option>Beijing</sd-option>
      <sd-option :tag-props="{ color: 'red' }">Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
      <sd-option>Shenzhen</sd-option>
      <sd-option>Wuhan</sd-option>
    </sd-select>
  </sd-space>
</template>

<script setup lang="ts">
  import type { Size } from '@sdata/web-vue';

  import { ref } from 'vue';

  const scrollbar = ref(true);
</script>
