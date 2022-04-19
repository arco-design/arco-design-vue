```yaml
title:
  zh-CN: 可拖拽表格
  en-US: Draggable table
```

## zh-CN

（实验性）
开启表格行可拖拽功能

---

## en-US

(experimental)
Enable drag and drop function of table rows

---

```vue
<template>
  <a-table :columns="columns" :data="data" @change="handleChange" :draggable="{}"></a-table>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const columns = reactive([
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
    ]);
    const data = ref([{
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
    const handleChange = (_data) => {
      console.log(_data);
      data.value = _data
    }

    return {
      columns,
      data,
      handleChange
    }
  },
}
</script>
```
