```yaml
title:
  zh-CN: 表格滚动
  en-US: Table Scroll
```

## zh-CN

设置 scroll 属性可以开启表格滚动。x 指表格的实际宽度，一般设置的值会大于表格容器宽度；y 指表格的显示高度，表格实际高度超出后会显示滚动条。
2.18.0 版本后 x, y 均可设置百分比。y 设置为 100% 可以让表格容器高度跟随外层容器，超出后自动显示滚动条。

---

## en-US

$END$

---

```vue
<template>
  <a-table :columns="columns" :data="data" :scroll="scroll" />
  <a-split direction="vertical" :default-size="0.9" :style="{height: '500px', marginTop: '30px'}">
    <template #first>
      <a-table :columns="columns" :data="data" :scroll="scrollPercent" />
    </template>
  </a-split>

</template>

<script>
export default {
  data() {
    return {
      scroll:{
        x: 2000,
        y: 200
      },
      scrollPercent: {
        x: '120%',
        y: '100%'
      },
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
      data: [
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
      ]
    }
  }
}
</script>
```
