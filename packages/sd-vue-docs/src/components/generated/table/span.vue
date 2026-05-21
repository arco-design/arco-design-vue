<template>
  <sd-space direction="vertical" size="large" class="sd:w-full">
    <sd-table :columns="columns" :data="data" :span-method="spanMethod" />
    <sd-table
      :columns="columns"
      :data="data"
      :span-method="dataSpanMethod"
      :bordered="{ wrapper: true, cell: true }"
    />
    <sd-table
      :columns="columns"
      :data="data"
      :row-selection="{ type: 'checkbox' }"
      :span-method="spanMethodAll"
      span-all
      :bordered="{ wrapper: true, cell: true }"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import type {
    TableColumnData,
    TableData,
    TableSpanMethod,
    TableSpanMethodContext,
  } from '@sdata/web-vue';

  const spanMethod: TableSpanMethod = ({ rowIndex, columnIndex }: TableSpanMethodContext) => {
    if (rowIndex === 1 && columnIndex === 1) {
      return {
        rowspan: 2,
        colspan: 3,
      };
    }
  };
  const dataSpanMethod: TableSpanMethod = ({ record, column }: TableSpanMethodContext) => {
    if (record.name === 'Alisa Ross' && 'dataIndex' in column && column.dataIndex === 'salary') {
      return {
        rowspan: 2,
      };
    }
  };
  const spanMethodAll: TableSpanMethod = ({ rowIndex, columnIndex }: TableSpanMethodContext) => {
    if (rowIndex === 1 && columnIndex === 0) {
      return { rowspan: 2 };
    }

    if (rowIndex === 1 && columnIndex === 2) {
      return {
        rowspan: 2,
        colspan: 3,
      };
    }
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
  const data: TableData[] = [
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
  ];
</script>
