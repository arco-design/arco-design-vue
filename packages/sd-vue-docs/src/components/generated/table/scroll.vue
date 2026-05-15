<template>
  <div class="sd:mb-5">
    <sd-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <sd-table :columns="columns" :data="data" :scroll="scroll" :scrollbar="scrollbar" />
  <div class="sd:mt-7.5 sd:h-125">
    <sd-table :columns="columns" :data="data" :scroll="scrollPercent" :scrollbar="scrollbar" />
  </div>
</template>

<script setup lang="ts">
  import type {
    TableChangeExtra,
    TableColumnData,
    TableData,
    TableExpandable,
    TableLoadMore,
    TableRowKey,
    TableRowSelection,
    TableSpanMethod,
    TableSpanMethodContext,
    TableSummary,
    TableSummaryContext,
  } from '@sdata/web-vue';

  import { reactive, ref } from 'vue';

  const scrollbar = ref(true);
  const scroll = {
    x: 2000,
    y: 200,
  };
  const scrollPercent = {
    x: '120%',
    y: '100%',
  };
  const columns: TableColumnData[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = reactive<TableData[]>([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ]);
</script>
