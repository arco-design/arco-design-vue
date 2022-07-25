```yaml
title:
  zh-CN: 自定义表格元素
  en-US: Custom Table Element
```

## zh-CN

可以通过特定插槽自定义表格元素的渲染。仅需要传入表格元素，内部属性会自动附加上去

---

## en-US

The rendering of table elements can be customized through specific slots. Only need to pass in the table element, the
internal attributes will be automatically attached

---

```vue
<template>
  <a-table :columns="columns" :data="data" row-class="common-row">
    <template #tr>
      <tr class="my-tr" @contextmenu="onContextMenu" />
    </template>
    <template #td>
      <td class="my-td" />
    </template>
  </a-table>
</template>

<script>
export default {
  setup() {
    const onContextMenu = () => {
      console.log('right click')
    }

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
    }];
    const data = [{
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
      columns,
      data,
      onContextMenu,
    }
  },
}
</script>
```
