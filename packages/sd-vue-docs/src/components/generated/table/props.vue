<template>
  <sd-form layout="inline" :model="form">
    <sd-form-item label="Border" field="border">
      <sd-switch v-model="form.border" />
    </sd-form-item>
    <sd-form-item label="Hover" field="hover">
      <sd-switch v-model="form.hover" />
    </sd-form-item>
    <sd-form-item label="stripe" field="stripe">
      <sd-switch v-model="form.stripe" />
    </sd-form-item>
    <sd-form-item label="checkbox" field="checkbox">
      <sd-switch v-model="form.checkbox" />
    </sd-form-item>
    <sd-form-item label="checkAll" field="checkAll">
      <sd-switch v-model="rowSelection.showCheckedAll" />
    </sd-form-item>
    <sd-form-item label="loading" field="loading">
      <sd-switch v-model="form.loading" />
    </sd-form-item>
    <sd-form-item label="tableHeader" field="tableHeader">
      <sd-switch v-model="form.tableHeader" />
    </sd-form-item>
    <sd-form-item label="noData" field="noData">
      <sd-switch v-model="form.noData" />
    </sd-form-item>
  </sd-form>
  <sd-table
    :columns="columns"
    :data="form.noData ? [] : data"
    :bordered="form.border"
    :hoverable="form.hover"
    :stripe="form.stripe"
    :loading="form.loading"
    :show-header="form.tableHeader"
    :row-selection="form.checkbox ? rowSelection : undefined"
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

  import { reactive } from 'vue';

  const form = reactive({
    border: true,
    borderCell: false,
    hover: true,
    stripe: false,
    checkbox: true,
    loading: false,
    tableHeader: true,
    noData: false,
  });

  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
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
