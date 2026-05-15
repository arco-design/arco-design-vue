<template>
  <sd-descriptions :data="data" title="User Info" bordered />
</template>

<script setup lang="ts">
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
