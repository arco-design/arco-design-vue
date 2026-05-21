<template>
  <sd-select
    v-model="value"
    :options="options"
    :field-names="fieldNames"
    class="sd:w-80"
    placeholder="Please select ..."
  />
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const value = ref('bj');
  const fieldNames = { value: 'city', label: 'text' };
  const options = reactive([
    {
      city: 'bj',
      text: 'Beijing',
    },
    {
      city: 'sh',
      text: 'Shanghai',
    },
    {
      city: 'gz',
      text: 'Guangzhou',
    },
    {
      city: 'cd',
      text: 'Chengdu',
    },
  ]);
</script>
