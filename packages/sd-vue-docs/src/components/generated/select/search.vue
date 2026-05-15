<template>
  <sd-space direction="vertical" size="large">
    <sd-select class="sd:w-80" placeholder="Please select ..." allow-search>
      <sd-option>Beijing</sd-option>
      <sd-option>Shanghai</sd-option>
      <sd-option>Guangzhou</sd-option>
      <sd-option disabled>Disabled</sd-option>
      <sd-option>Shenzhen</sd-option>
      <sd-option>Chengdu</sd-option>
      <sd-option>Wuhan</sd-option>
    </sd-select>
    <sd-select
      class="sd:w-80"
      placeholder="Please select ..."
      :allow-search="{ retainInputValue: true }"
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
      :options="options"
      class="sd:w-80"
      :loading="loading"
      placeholder="Please select ..."
      multiple
      @search="handleSearch"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const options = ref(['Option1', 'Option2', 'Option3']);
  const loading = ref(false);

  const handleSearch = (value) => {
    if (value) {
      loading.value = true;
      window.setTimeout(() => {
        options.value = [`${value}-Option1`, `${value}-Option2`, `${value}-Option3`];
        loading.value = false;
      }, 2000);
    } else {
      options.value = [];
    }
  };
</script>
