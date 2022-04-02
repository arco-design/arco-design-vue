```yaml
title:
  zh-CN: 行选择器（单选框）
  en-US: Row Selection (Radio)
```

## zh-CN

通过设置 `rowSelection.type='radio'` 开启单选模式。

---

## en-US

Enable single selection mode by setting `rowSelection.type='radio'`.

---

```vue
<template>
  <a-table :columns="columns" :data="data" :row-selection="rowSelection" />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const rowSelection = {
      type: 'radio'
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
      email: 'kevin.sandra@example.com'
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
      data
    }
  },
}
</script>
```
