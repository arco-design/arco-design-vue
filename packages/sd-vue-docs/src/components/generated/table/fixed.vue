<template>
  <sd-table :columns="columns" :data="data" :scroll="scroll" :expandable="expandable" />
</template>

<script setup lang="ts">
  import type { TableColumnData, TableData, TableExpandable } from '@sdata/web-vue';

  import { reactive } from 'vue';

  const columns: TableColumnData[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 140,
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
      fixed: 'right',
      width: 200,
    },
  ];

  const expandable: TableExpandable = {
    title: 'Expand',
    width: 80,
  };

  const scroll = {
    x: 2000,
    y: 200,
  };

  const data = reactive<TableData[]>([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      expand: 'Expand Content',
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
