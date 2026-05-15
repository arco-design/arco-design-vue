<template>
  <sd-table :columns="columns" :data="data">
    <template #optional="{ record }">
      <sd-button @click="$modal.info({ title: 'Name', content: record.name })">view</sd-button>
    </template>
  </sd-table>
  <sd-table :data="data" class="sd:mt-7.5">
    <template #columns>
      <sd-table-column title="Name">
        <sd-table-column title="First Name" data-index="first"></sd-table-column>
        <sd-table-column title="Last Name" data-index="last"></sd-table-column>
      </sd-table-column>
      <sd-table-column title="Salary" data-index="salary"></sd-table-column>
      <sd-table-column title="Address" data-index="address"></sd-table-column>
      <sd-table-column title="Email" data-index="email"></sd-table-column>
      <sd-table-column title="Optional">
        <template #cell="{ record }">
          <sd-button @click="$modal.info({ title: 'Name', content: record.name })">view</sd-button>
        </template>
      </sd-table-column>
    </template>
  </sd-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const show = ref(true);

  const columns = [
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
    {
      title: 'Optional',
      slotName: 'optional',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      first: 'Jane',
      last: 'Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      first: 'Alisa',
      last: 'Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      first: 'Kevin',
      last: 'Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      first: 'Ed',
      last: 'Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      first: 'William',
      last: 'Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];
</script>
