```yaml
title:
  zh-CN: 固定列
  en-US: Fixed Column
```

## zh-CN

在 `columns` 中指定 `fixed: 'left'` 或 `fixed: 'right'`，可将列固定到左侧或右侧。设置了 `fixed` 的列必须设置 `width` 指定列的宽度。
**注意**：要配合 `:scroll="{ x: number }"` 使用。此外 `columns` 中至少需要有一列不设置宽度，自适应，不然会有样式问题。


---

## en-US

Specify `fixed:'left'` or `fixed:'right'` in `columns` to fix the column to the left or right. Columns with `fixed` must
be set to the width of the column specified by `width`.
**Note**: Use with `:scroll="{ x: number }"`. In addition, there must be at least one column in `columns` that does not
set the width and is adaptive, otherwise there will be style problems.

---

```vue
<template>
  <a-table :columns="columns" :data="data" :scroll="scroll" :expandable="expandable" />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const columns = [
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
    ];

    const expandable = {
      title: 'Expand',
      width: 80,
    }

    const scroll = {
      x: 2000,
      y: 200
    }

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
    ]);

    return {
      columns,
      expandable,
      scroll,
      data
    }
  },
}
</script>
```
