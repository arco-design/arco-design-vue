```yaml
title:
  zh-CN: 排序和筛选
  en-US: Sort & Filter
```

## zh-CN

通过设置 `columns` 中的 `sortable` 和 `filterable` 属性，可以配置排序和筛选功能。 通过 `filter-icon-align-left` 属性可以让筛选按钮左对齐。
可以通过设置 `sortable.sorter=true` 来关闭内部排序，并通过 `change` 或者 `sorterChange` 事件来实现服务器端排序。

---

## en-US

You can configure the sorting and filtering functions by setting the `sortable` and `filterable` attributes in `columns`
. The filter button can be aligned to the left through the `filter-icon-align-left` property. Internal sorting can be
turned off by setting `sortable.sorter=true`, and server-side sorting can be implemented via the `change`
or `sorterChange` events.

---

```vue
<template>
  <a-space direction="vertical" size="large" fill>
    <a-space>
      <a-switch v-model="alignLeft" />
      <span>Filter icon align left: {{alignLeft}}</span>
    </a-space>
    <a-table :columns="columns" :data="data" :filter-icon-align-left="alignLeft" @change="handleChange" />
  </a-space>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const alignLeft = ref(false);

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        sortable: {
          sortDirections: ['ascend', 'descend']
        }
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        sortable: {
          sortDirections: ['ascend']
        },
        filterable: {
          filters: [{
            text: '> 20000',
            value: '20000',
          }, {
            text: '> 30000',
            value: '30000',
          }],
          filter: (value, record) => record.salary > value,
          multiple: true
        }
      },
      {
        title: 'Address',
        dataIndex: 'address',
        filterable: {
          filters: [{
            text: 'London',
            value: 'London',
          }, {
            text: 'Paris',
            value: 'Paris',
          },],
          filter: (value, row) => row.address.includes(value),
        }
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ];
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

    const handleChange = (data, extra, currentDataSource) => {
      console.log('change', data, extra, currentDataSource)
    }

    return {
      alignLeft,
      columns,
      data,
      handleChange
    }
  },
}
</script>
```
