<template>
  <sd-radio-group type="button" v-model="size">
    <sd-radio value="mini">mini</sd-radio>
    <sd-radio value="small">small</sd-radio>
    <sd-radio value="medium">medium</sd-radio>
    <sd-radio value="large">large</sd-radio>
  </sd-radio-group>
  <sd-descriptions class="sd:mt-5" :data="data" :size="size" title="User Info" :column="1" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const size = ref('medium');

  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];
</script>
