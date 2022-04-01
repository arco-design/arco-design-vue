```yaml
title:
  zh-CN: 单元格合并
  en-US: Cell Span
```

## zh-CN

通过 `span-method` 属性进行单元格合并。可以设置 `span-all` 让列索引包含操作列，注意：目前如果合并多项选择器会导致全选状态判断错误。

---

## en-US

Cell merging is done via the `span-method` property. You can set `span-all` to make the column index include the operation column. Note: At present, if the multiple selectors are merged, the judgment of the all selection state will be wrong.

---

```vue
<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <a-table :columns="columns" :data="data" :span-method="spanMethod" />
    <a-table :columns="columns" :data="data" :span-method="dataSpanMethod" :bordered="{wrapper: true, cell: true}" />
    <a-table :columns="columns" :data="data" :row-selection="{type: 'checkbox'}" :span-method="spanMethodAll" span-all :bordered="{wrapper: true, cell: true}" />
  </a-space>
</template>

<script>
export default {
  setup(){
    const spanMethod= ({rowIndex, columnIndex}) => {
      if (rowIndex === 1 && columnIndex === 1) {
        return {
          rowspan: 2,
          colspan: 3
        }
      }
    };
    const  dataSpanMethod= ({record, column}) => {
      if (record.name === 'Alisa Ross' && column.dataIndex === 'salary') {
        return {
          rowspan: 2,
        }
      }
    };
    const  spanMethodAll= ({rowIndex, columnIndex}) => {
      if (rowIndex === 1 && columnIndex === 0) {
        return {rowspan: 2}
      }

      if (rowIndex === 1 && columnIndex === 2) {
        return {
          rowspan: 2,
          colspan: 3
        }
      }
    };
    const columns=[
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
    const data=[{
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
    }];

    return {
      spanMethod,
      dataSpanMethod,
      spanMethodAll,
      columns,
      data
    }
  },
}
</script>
```
