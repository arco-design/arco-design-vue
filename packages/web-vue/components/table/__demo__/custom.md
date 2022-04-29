```yaml
title:
  zh-CN: 自定义渲染
  en-US: Custom Columns
```

## zh-CN

通过 `#columns` 插槽和 `<a-table-column>` 组件可以使用模板的方法自定义列渲染。
**注意**：在使用 `#columns` 插槽后，将会屏蔽 `columns` 属性

---

## en-US

With the `#columns` slot and the `<a-table-column>` component, you can customize the column rendering using the template
method.
**Note**: After using the `#columns` slot, the `columns` attribute will be blocked

---

```vue
<template>
  <a-table :columns="columns" :data="data">
    <template #optional="{ record }">
      <a-button @click="$modal.info({ title:'Name', content:record.name })">view</a-button>
    </template>
  </a-table>
  <a-table :data="data" style="margin-top: 30px">
    <template #columns>
      <a-table-column title="Name">
        <a-table-column title="First Name" data-index="first"></a-table-column>
        <a-table-column title="Last Name" data-index="last"></a-table-column>
      </a-table-column>
      <a-table-column title="Salary" data-index="salary"></a-table-column>
      <a-table-column title="Address" data-index="address"></a-table-column>
      <a-table-column title="Email" data-index="email"></a-table-column>
      <a-table-column title="Optional">
        <template #cell="{ record }">
          <a-button @click="$modal.info({ title:'Name', content:record.name })">view</a-button>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(true)

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Salary',
      dataIndex: 'salary',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }, {
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: 'Optional',
      slotName: 'optional'
    }];
    const data = [{
      key: '1',
      name: 'Jane Doe',
      first: 'Jane',
      last: 'Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      first: 'Alisa',
      last: 'Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      first: 'Kevin',
      last: 'Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      first: 'Ed',
      last: 'Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      first: 'William',
      last: 'Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }];

    return {
      columns,
      data,
      show
    }
  },
}
</script>
```
