```yaml
title:
  zh-CN: 行选择器
  en-US: Row Selection
```

## zh-CN

通过设置 `row-selection` 开启行选择器。

---

## en-US

Turn on the row selector by setting `row-selection`.

---

```vue
<template>
  <a-space direction="vertical" size="large" fill>
    <div>
      <span>OnlyCurrent: </span>
      <a-switch v-model="rowSelection.onlyCurrent" />
    </div>
    <a-table row-key="name" :columns="columns" :data="data" :row-selection="rowSelection"
             v-model:selectedKeys="selectedKeys" :pagination="pagination" />
  </a-space>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);

    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      onlyCurrent: false,
    });
    const pagination = {pageSize: 5}

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
    ]
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
      disabled: true
    }, {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }, {
      key: '6',
      name: 'Jane Doe 2',
      salary: 15000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '7',
      name: 'Alisa Ross 2',
      salary: 28000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '8',
      name: 'Kevin Sandra 2',
      salary: 26000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    }, {
      key: '9',
      name: 'Ed Hellen 2',
      salary: 18000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '10',
      name: 'William Smith 2',
      salary: 12000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }]);

    return {
      rowSelection,
      columns,
      data,
      selectedKeys,
      pagination
    }
  },
}
</script>
```
