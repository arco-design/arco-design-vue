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
  <a-table row-key="name" :columns="columns" :data="data" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" />
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const selectedKeys = ref([]);

    const rowSelection = {
      type: 'checkbox',
      showCheckedAll: true
    };
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
    }]);

    return {
      rowSelection,
      columns,
      data,
      selectedKeys
    }
  },
}
</script>
```
