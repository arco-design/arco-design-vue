```yaml
title:
  zh-CN: 调整列宽
  en-US: Column Width Resize
```

## zh-CN

使用 `column-resizable` 属性开启列宽调整。建议初始设置除最后一列外其他列的默认列宽。

---

## en-US

Enable column resizing using the `column-resizable` property. It is recommended to initially set default column widths for all but the last column.

---

```vue
<template>
  <a-table :columns="columns" :data="data" column-resizable :bordered="{cell:true}"></a-table>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const columns = reactive([
      {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
        minWidth: 100,
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        width: 120,
        minWidth: 80,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: 300,
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ]);
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
      columns,
      data
    }
  },
}
</script>
```
