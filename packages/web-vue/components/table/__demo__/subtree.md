```yaml
title:
  zh-CN: 树形数据展示
  en-US: SubTree
```

## zh-CN

树形数据展示的例子，`data` 里有 `children` 字段时会展示为树形表格。

---

## en-US

An example of tree data display, when there is a `children` field in `data`, it will be displayed as a tree table.

---

```vue

<template>
  <a-table :columns="columns" :data="data" v-model:expandedKeys="expandedKeys" />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const expandedKeys = ref([]);

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
    const data = [{
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
              email: 'ed.hellen@example.com'
            }, {
              key: '4',
              name: 'William Smith',
              salary: 27000,
              address: '62 Park Road, London',
              email: 'william.smith@example.com'
            }
          ]
        },
        {
          key: '5',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        }
      ]
    }, {
      key: '6',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '7',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '8',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '9',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }];

    return {
      columns,
      data,
      expandedKeys
    }
  },
}
</script>
```
