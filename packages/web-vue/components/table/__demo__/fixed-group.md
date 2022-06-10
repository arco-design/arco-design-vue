```yaml
title:
  zh-CN: 分组表头与固定列
  en-US: Column Group & Fixed Column
```

## zh-CN

分组表头使用固定列时，需要优先指定数据列为固定列。
如果一个分组下的所有数据列都是固定列，此时可以设置分组列为固定列，宽度为子列宽度之和。

---

## en-US

When a fixed column is used in the grouping header, the data column needs to be specified as a fixed column first.
If all data columns under a group are fixed columns, you can set the group column to be a fixed column, and the width is the sum of the widths of the sub-columns.

---

```vue
<template>
  <a-table :columns="columns" :data="data" :bordered="{cell:true}" :scroll="{ x: 2000 }"/>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 140,
    }, {
      title: 'User Info',
      children: [{
        title: 'Birthday',
        dataIndex: 'birthday',
        fixed: 'left',
        width: 200,
      }, {
        title: 'Address',
        children: [{
          title: 'City',
          dataIndex: 'city',
          fixed: 'left',
          width: 100,
        }, {
          title: 'Road',
          dataIndex: 'road',
        }, {
          title: 'No.',
          dataIndex: 'no',
        }]
      }]
    }, {
      title: 'Information',
      children: [{
        title: 'Email',
        dataIndex: 'email',
      }, {
        title: 'Phone',
        dataIndex: 'phone',
      }]
    }, {
      title: 'Salary',
      dataIndex: 'salary',
      fixed: 'right',
      width: 120
    }];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      birthday: '1994-04-21',
      city: 'London',
      road: 'Park',
      no: '34',
      phone: '12345678',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      birthday: '1994-05-21',
      city: 'London',
      road: 'Park',
      no: '37',
      phone: '12345678',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      birthday: '1992-02-11',
      city: 'Paris',
      road: 'Arco',
      no: '67',
      phone: '12345678',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      birthday: '1991-06-21',
      city: 'London',
      road: 'Park',
      no: '317',
      phone: '12345678',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      birthday: '1996-08-21',
      city: 'Paris',
      road: 'Park',
      no: '114',
      phone: '12345678',
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
