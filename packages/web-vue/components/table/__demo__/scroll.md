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

Setting the scroll property enables table scrolling. x refers to the actual width of the table. Generally, the value set will be larger than the width of the table container; y refers to the display height of the table. When the actual height of the table exceeds, a scroll bar will be displayed.
After version 2.18.0, both x, y can set percentage. Setting y to 100% can make the height of the table container follow the outer container, and automatically display the scroll bar when it exceeds.

---

```vue
<template>
  <div style="margin-bottom: 20px">
    <a-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <a-table :columns="columns" :data="data" :scroll="scroll" :scrollbar="scrollbar" />
  <a-split direction="vertical" :default-size="0.9" :style="{height: '500px', marginTop: '30px'}">
    <template #first>
      <a-table :columns="columns" :data="data" :scroll="scrollPercent" :scrollbar="scrollbar" />
    </template>
  </a-split>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const scrollbar = ref(true);
    const scroll = {
      x: 2000,
      y: 200
    };
    const scrollPercent = {
      x: '120%',
      y: '100%'
    };
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
    }]);

    return {
      scroll,
      scrollPercent,
      columns,
      data,
      scrollbar
    }
  },
}
</script>
```
