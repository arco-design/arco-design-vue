<template>
  <sd-space direction="vertical" size="large">
    <div>Show selections after search options</div>
    <sd-select
      class="sd:w-80"
      :loading="loading"
      placeholder="Please select ..."
      multiple
      @search="handleSearch"
      :filter-option="false"
    >
      <sd-option v-for="item of options" :value="item">{{ item }}</sd-option>
    </sd-select>
    <div>Hide selections after search options</div>
    <sd-select
      :options="options"
      class="sd:w-80"
      :loading="loading"
      placeholder="Please select ..."
      multiple
      @search="handleSearch"
      :filter-option="false"
      :show-extra-options="false"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import type { Size } from '@sdata/web-vue';

  import { ref } from 'vue';

  const options = ref(['Option1', 'Option2', 'Option3']);
  const loading = ref(false);

  const handleSearch = (value: string) => {
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
