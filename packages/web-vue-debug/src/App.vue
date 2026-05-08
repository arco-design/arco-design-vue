<script setup lang="ts">
  import { shallowRef } from 'vue';

  import Select from '@web-vue-src/select';

  const options = shallowRef(
    Array.from({ length: 100 }, (_, i) => ({
      label: `选项${i + 1}长长长长长长长长长`,
      value: i + 1,
    })),
  );
</script>

<template>
  <main style="width: 200px">
    <Select :options="options" multiple max-tag-count="responsive" />
  </main>
</template>
