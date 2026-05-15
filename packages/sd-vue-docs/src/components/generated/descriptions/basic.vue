<template>
  <sd-space direction="vertical" size="large" fill>
    <sd-descriptions :data="data" title="User Info" layout="inline-horizontal" />
    <sd-descriptions title="User Info" :column="{ xs: 1, md: 3, lg: 4 }">
      <sd-descriptions-item
        v-for="item of data"
        :label="typeof item.label === 'string' ? item.label : undefined"
        :span="item.span ?? 1"
      >
        <sd-tag>{{ item.value }}</sd-tag>
      </sd-descriptions-item>
    </sd-descriptions>
  </sd-space>
</template>

<script setup lang="ts">
  import type { DescData, Size } from '@sdata/web-vue';

  const data: DescData[] = [
    {
      label: 'Name',
      value: 'Socrates',
      span: 3,
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
