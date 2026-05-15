<template>
  <sd-table :columns="columns" :data="data" :summary="true" :summary-span-method="spanMethod" />
  <sd-table
    :columns="columns"
    :data="data"
    :scroll="scroll"
    :expandable="expandable"
    :summary="summary"
  >
    <template #summary-cell="{ column, record, rowIndex }">
      <div :class="getColorClass(column, record)">{{ getSummaryValue(column, record) }}</div>
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

  import type { CSSProperties } from 'vue';
  import { reactive } from 'vue';

  const expandable: TableExpandable = {
    title: 'Expand',
    width: 80,
  };
  const scroll = {
    x: 2000,
    y: 200,
  };
  const columns = reactive<TableColumnData[]>([
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 140,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      summaryCellStyle: (record): CSSProperties => {
        if (record.salary > 100000) {
          return {
            backgroundColor: 'rgb(var(--sdblue-6))',
            color: '#fff',
          };
        }

        return {};
      },
    },
    {
      title: 'Data1',
      dataIndex: 'data1',
    },
    {
      title: 'Data2',
      dataIndex: 'data2',
    },
  ]);
  const data = reactive<TableData[]>([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      data1: 10,
      data2: 8,
      expand: 'Expand Content',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      data1: 9,
      data2: -12,
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      data1: 15,
      data2: -2,
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      data1: 2,
      data2: 3,
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      data1: 11,
      data2: 0,
    },
  ]);

  const summary: TableSummary = ({ columns, data }: TableSummaryContext) => {
    let countData = {
      salary: 0,
      data1: 0,
      data2: 0,
    };
    data.forEach((record) => {
      countData.salary += record.salary;
      countData.data1 += record.data1;
      countData.data2 += record.data2;
    });

    return [
      {
        name: 'Avg',
        salary: countData.salary / data.length,
        data1: countData.data1 / data.length,
        data2: countData.data2 / data.length,
      },
      {
        name: 'Sum',
        salary: countData.salary,
        data1: countData.data1,
        data2: countData.data2,
      },
    ];
  };

  const getColorClass = (column: TableColumnData, record: TableData) => {
    const dataIndex = column.dataIndex;

    if (dataIndex && ['data1', 'data2'].includes(dataIndex)) {
      return record[dataIndex] > 0 ? 'sd:text-[red]' : 'sd:text-[green]';
    }
    return undefined;
  };

  const getSummaryValue = (column: TableColumnData, record: TableData) => {
    const dataIndex = column.dataIndex;

    return dataIndex ? record[dataIndex] : undefined;
  };

  const spanMethod: TableSpanMethod = ({ rowIndex, columnIndex }: TableSpanMethodContext) => {
    if (rowIndex === 0 && columnIndex === 1) {
      return {
        colspan: 2,
      };
    }
  };
</script>
