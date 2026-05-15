<template>
  <sd-table :columns="columns" :data="data" @change="handleChange">
    <template
      #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }"
    >
      <div class="custom-filter">
        <sd-space direction="vertical">
          <sd-input :model-value="filterValue[0]" @input="(value) => setFilterValue([value])" />
          <div class="custom-filter-footer">
            <sd-button @click="handleFilterConfirm">Confirm</sd-button>
            <sd-button @click="handleFilterReset">Reset</sd-button>
          </div>
        </sd-space>
      </div>
    </template>
  </sd-table>
</template>

<script setup lang="ts">
  import { reactive, h } from 'vue';

  import { IconSearch } from '@sdata/web-vue/es/icon/index.js';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filterable: {
        filter: (value, record) => record.name.includes(value),
        slotName: 'name-filter',
        icon: () => h(IconSearch),
      },
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      sortable: {
        sortDirections: ['ascend'],
      },
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
  const data = reactive([
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

  const handleChange = (data, extra, currentDataSource) => {
    console.log('change', data, extra, currentDataSource);
  };
</script>

<style>
  .custom-filter {
    padding: 20px;
    background: var(--color-bg-5);
    border: 1px solid var(--color-neutral-3);
    border-radius: var(--border-radius-medium);
    box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
  }

  .custom-filter-footer {
    display: flex;
    justify-content: space-between;
  }
</style>
