<template>
  <sd-table :columns="columns" :data="data">
    <template #name="{ rowIndex }">
      <sd-input v-model="data[rowIndex].name" />
    </template>
    <template #province="{ rowIndex }">
      <sd-select v-model="data[rowIndex].province" @change="() => handleChange(rowIndex)">
        <sd-option v-for="value of Object.keys(options)">{{ value }}</sd-option>
      </sd-select>
    </template>
    <template #city="{ rowIndex }">
      <sd-select :options="options[data[rowIndex].province] || []" v-model="data[rowIndex].city" />
    </template>
  </sd-table>
  <!-- support from v2.25.0  -->
  <sd-table :columns="columns" :data="data" class="sd:mt-5">
    <template #name="{ record, rowIndex }">
      <sd-input v-model="record.name" />
    </template>
    <template #province="{ record, rowIndex }">
      <sd-select
        v-model="record.province"
        @change="
          () => {
            record.city = '';
          }
        "
      >
        <sd-option v-for="value of Object.keys(options)">{{ value }}</sd-option>
      </sd-select>
    </template>
    <template #city="{ record, rowIndex }">
      <sd-select :options="options[record.province] || []" v-model="record.city" />
    </template>
  </sd-table>
</template>

<script setup lang="ts">
  import type { TableColumnData, TableData } from '@sdata/web-vue';

  import { reactive } from 'vue';

  const options: Record<string, string[]> = {
    Beijing: ['Haidian', 'Chaoyang', 'Changping'],
    Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
    Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou'],
  };
  const columns: TableColumnData[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      slotName: 'name',
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
      title: 'Province',
      dataIndex: 'province',
      slotName: 'province',
    },
    {
      title: 'City',
      dataIndex: 'city',
      slotName: 'city',
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
      province: 'Beijing',
      city: 'Haidian',
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
      province: 'Sichuan',
      city: 'Mianyang',
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

  const handleChange = (rowIndex: number) => {
    data[rowIndex].city = '';
  };
</script>
