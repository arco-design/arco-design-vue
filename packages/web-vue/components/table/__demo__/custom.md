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

With the `#columns` slot and the `<a-table-column>` component, you can customize the column rendering using the template method.
**Note**: After using the `#columns` slot, the `columns` attribute will be blocked

---

```vue
<template>
  <a-table :data="data">
    <template #columns>
      <a-table-column title="Name" dataIndex="name" />
      <a-table-column title="Salary" dataIndex="salary" />
      <a-table-column title="Address" dataIndex="address" />
      <a-table-column title="Email" dataIndex="email" />
      <a-table-column title="Optional">
        <template #cell="{ record }">
          <a-button @click="$modal.info({ title:'Name', content:record.name })">view</a-button>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

<script>
export default {
  data() {
    return {
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
