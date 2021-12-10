```yaml
title:
  zh-CN: 单元格合并
  en-US: Cell Span
```

## zh-CN

通过 `span-method` 属性进行单元格合并

---

## en-US

Combine cells through the `span-method` attribute

---

```vue

<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <a-table :columns="columns" :data="data" :span-method="spanMethod" />
    <a-table :columns="columns" :data="data" :span-method="dataSpanMethod" :bordered="{wrapper: true, cell: true}" />
  </a-space>
</template>

<script>
export default {
  methods: {
    spanMethod: ({rowIndex, columnIndex}) => {
      if (rowIndex === 1 && columnIndex === 1) {
        return {
          rowspan: 2,
          colspan: 3
        }
      }
    },
    dataSpanMethod: ({record, column}) => {
      if (record.name === 'Alisa Ross' && column.dataIndex === 'salary') {
        return {
          rowspan: 2,
        }
      }
    }
  },
  data() {
    return {
      columns: [
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
      ],
      data: [{
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
      }]
    }
  }
}
</script>
```
