<template>
  <sd-space direction="vertical" size="large">
    <sd-select class="sd:w-80" placeholder="Please select ..." allow-search :options="options" />
    <sd-select
      class="sd:w-80"
      placeholder="Please select ..."
      :allow-search="{ retainInputValue: true }"
      :options="options"
    />
    <sd-select
      :options="remoteOptions"
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

  const options = [
    'Beijing',
    'Shanghai',
    'Guangzhou',
    { label: 'Disabled', disabled: true },
    'Shenzhen',
    'Chengdu',
    'Wuhan',
  ];
  const remoteOptions = ref(['Option1', 'Option2', 'Option3']);
  const loading = ref(false);

  const handleSearch = (value: string) => {
    if (value) {
      loading.value = true;
      window.setTimeout(() => {
        remoteOptions.value = [`${value}-Option1`, `${value}-Option2`, `${value}-Option3`];
        loading.value = false;
      }, 2000);
    } else {
      remoteOptions.value = [];
    }
  };
</script>
