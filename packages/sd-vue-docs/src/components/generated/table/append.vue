<template>
  <sd-table :columns="columns" :data="data" :pagination="false">
    <template #append>
      <div class="table-append-demo">
        <div>
          <strong>已加载 {{ data.length }} 条记录</strong>
          <div class="table-append-demo__hint">append 插槽会渲染在表格最后一行之后。</div>
        </div>
        <sd-button type="primary" size="small" @click="appendRecord">追加一条</sd-button>
      </div>
    </template>
  </sd-table>
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
  ];

  const data = reactive<TableData[]>([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
    },
  ]);

  const appendRecord = () => {
    data.push({
      key: String(data.length + 1),
      name: `New Staff ${data.length + 1}`,
      salary: 20000 + data.length * 1000,
      address: `${40 + data.length} Park Road, London`,
    });
  };
</script>

<style scoped>
  .table-append-demo {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: var(--sd-color-fill-1);
    border-top: 1px dashed var(--sd-color-neutral-3);
  }

  .table-append-demo__hint {
    margin-top: 4px;
    color: var(--sd-color-text-3);
    font-size: 12px;
  }
</style>
