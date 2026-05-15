<template>
  <sd-table :columns="columns" :data="data" :load-more="loadMore" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

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
  ];
  const data = reactive([
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
        },
        {
          key: '5',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
          isLeaf: true,
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
      isLeaf: true,
    },
    {
      key: '8',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
      isLeaf: true,
    },
    {
      key: '9',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
      isLeaf: true,
    },
  ]);

  const loadMore = (record, done) => {
    window.setTimeout(() => {
      done([
        {
          key: `${record.key}-1`,
          name: 'Ed Hellen',
          salary: 17000,
          address: '42 Park Road, London',
          email: 'ed.hellen@example.com',
          isLeaf: true,
        },
        {
          key: `${record.key}-2`,
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com',
          isLeaf: true,
        },
      ]);
    }, 2000);
  };
</script>
