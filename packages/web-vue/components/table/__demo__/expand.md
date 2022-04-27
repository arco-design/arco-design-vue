```yaml
title:
  zh-CN: 展开行
  en-US: Expand Row
```

## zh-CN

通过设置 `expandable` 开启展开行功能。可以在 `data` 中添加 `expand` 属性，设置展开行显示内容。

---

## en-US

Enable the expand line function by setting `expandable`. You can add the `expand` attribute to the `data` to set the expanded line display content.

---

```vue
<template>
  <a-table :columns="columns" :data="data" :expandable="expandable" />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const expandable = reactive({
      title: 'Expand',
      width: 80,
      expandedRowRender: (record) => {
        if(record.key==='3'){
          return `My Name is ${record.name}`
        }
      }
    });

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
        expand: 'Expand Data'
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
      }
    ]);

    return {
      columns,
      expandable,
      data
    }
  },
}
</script>
```
