```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

表格的基本用法，需要传递 `columns` 和 `data`。

---

## en-US

For the basic usage of the table, you need to pass `columns` and `data`.

---

```vue

<template>
  <div @click="handleClick">{{cur}}</div>
  <a-table :columns="columns" :data="data" :pagination="{
  current:cur,
  onChange:change,
  pageSize: 1
  }"/>
</template>

<script>
import {reactive, ref} from 'vue';

export default {
  setup() {
    const cur = ref(10)
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
    }, {
      key: '6',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Rertoad, London',
      email: 'jane.doe@exttttttample.com'
    }, {
      key: '25',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park teertRoad, London',
      email: 'alisa.ross@g34texample.com'
    }, {
      key: '356',
      name: 'Kevin S34andra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '434t',
      name: 'Ed Helleterrten',
      salary: 17000,
      address: '42 Park Road34t34t, London',
      email: 'ed.hellen@example.com'
    }, {
      key: 'drts5',
      name: 'Willia43tsrsertm Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }]);
    const handleClick = () => {
      data.pop()

    }
    const change = (data) =>{
      debugger
      cur.value = data
    }
    return {
      handleClick,
      columns,
      data,
      cur,
      change
    }
  },
}
</script>
```
