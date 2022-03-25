```yaml
title:
  zh-CN: 总结行
  en-US: Summary
```

## zh-CN

设置 `summary` 可以开启表尾总结行，并可以通过 `summary-text` 指定首列文字。如果想要自定义总结行展示，可以传入函数。

---

## en-US

Set `summary` to turn on the summary line at the end of the table, and specify the first column of text
with `summary-text`. If you want to customize the summary line display, you can pass in a function.

---

```vue
<template>
  <a-table :columns="columns" :data="data" :scroll="scroll" :expandable="expandable" :summary="true" />
  <a-table :columns="columns" :data="data" :scroll="scroll" :expandable="expandable" :summary="summary" />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const expandable = {
      title: 'Expand',
      width: 80
    };
    const scroll = {
      x: 2000,
      y: 200
    }
    const columns = reactive([
      {
        title: 'Name',
        dataIndex: 'name',
        fixed: 'left',
        width: 140
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
        fixed: 'right',
        width: 200
      },
    ]);
    const data = reactive([
      {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
        expand: 'Expand Content'
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
    ])

    const summary = ({columns, data}) => {
      let count = 0;
      data.forEach(record => count += record.salary)


      return [{
        name: 'Avg',
        salary: count / data.length,
      }]
    }

    return {
      expandable,
      scroll,
      columns,
      data,
      summary
    }
  },
}
</script>
```
