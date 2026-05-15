<template>
  <sd-space>
    <span>checkStrictly:</span>
    <sd-switch v-model="rowSelection.checkStrictly" />
  </sd-space>
  <sd-table
    :columns="columns"
    :data="data"
    v-model:expandedKeys="expandedKeys"
    :row-selection="rowSelection"
    show-empty-tree
    class="sd:mt-5"
  />
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

  const expandedKeys = ref<string[]>([]);

  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    checkStrictly: true,
  });

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
  const data: TableData[] = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
          children: [
            {
              key: '3',
              name: 'Ed Hellen',
              salary: 17000,
              address: '42 Park Road, London',
              email: 'ed.hellen@example.com',
            },
            {
              key: '4',
              name: 'William Smith',
              salary: 27000,
              address: '62 Park Road, London',
              email: 'william.smith@example.com',
            },
          ],
        },
        {
          key: '5',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
      ],
    },
    {
      key: '6',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '7',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '8',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '9',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
      children: [],
    },
  ];
</script>
