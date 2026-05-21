<template>
  <sd-space direction="vertical" size="medium" fill>
    <div class="table-row-key-function-demo__status">
      <span>已选中: {{ selectedKeys.join(', ') || '无' }}</span>
      <span>已展开: {{ expandedKeys.join(', ') || '无' }}</span>
    </div>
    <sd-table
      :columns="columns"
      :data="data"
      :row-key="getRowKey"
      :row-selection="rowSelection"
      :expandable="expandable"
      v-model:selectedKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys"
      :pagination="false"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import type {
    TableColumnData,
    TableData,
    TableExpandable,
    TableRowKey,
    TableRowSelection,
  } from '@sdata/web-vue';

  import { reactive, ref } from 'vue';

  const selectedKeys = ref(['EMP-1002']);
  const expandedKeys = ref(['EMP-1001']);

  const columns: TableColumnData[] = [
    {
      title: 'Employee',
      dataIndex: 'name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const data = reactive<TableData[]>([
    {
      id: 'EMP-1001',
      name: 'Jane Doe',
      department: 'Design',
      email: 'jane.doe@example.com',
      expand: '负责组件规范与设计令牌维护。',
    },
    {
      id: 'EMP-1002',
      name: 'Alisa Ross',
      department: 'Frontend',
      email: 'alisa.ross@example.com',
      expand: '负责表格、列表等数据展示组件。',
    },
    {
      id: 'EMP-1003',
      name: 'Kevin Sandra',
      department: 'QA',
      email: 'kevin.sandra@example.com',
      expand: '负责文档站与组件回归验证。',
    },
  ]);

  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
  });

  const expandable = reactive<TableExpandable>({
    title: 'Details',
    width: 88,
  });

  const getRowKey: TableRowKey = (record: TableData) => String(record.id ?? '');
</script>

<style scoped>
  .table-row-key-function-demo__status {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    color: var(--sd-color-text-2);
    font-size: 13px;
  }
</style>
