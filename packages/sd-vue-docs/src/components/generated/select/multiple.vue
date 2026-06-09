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
      :options="options"
    />
    <sd-select
      :default-value="['Beijing', 'Shanghai', 'Guangzhou']"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      :max-tag-count="2"
      allow-clear
      :scrollbar="scrollbar"
      :options="options"
    />
    <sd-select
      :default-value="['Beijing', 'Shanghai']"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      :limit="2"
      :scrollbar="scrollbar"
      :options="options"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const scrollbar = ref(true);
  const options = [
    'Beijing',
    { label: 'Shanghai', tagProps: { color: 'red' } },
    'Guangzhou',
    { label: 'Disabled', disabled: true },
    'Shenzhen',
    'Wuhan',
  ];
</script>
