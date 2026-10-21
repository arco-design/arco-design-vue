```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

## zh-CN

设置 `virtual-list-props` 开启虚拟列表功能。
目前虚拟滚动表格受限比较多，开启虚拟滚动后不能使用展开行、树形数据、固定列等功能
使用 `span-method` 时，单个纵向合并区块的行数不应超过 `virtual-list-props.buffer`（默认 10），否则滚动到该区块上边界时可能错位；横向合并无此限制

---

## en-US

Set `virtual-list-props` to enable the virtual list function.
Currently, there are many restrictions on virtual scrolling tables. After enabling virtual scrolling, functions such as expanded rows, tree data, and fixed columns cannot be used.
When using `span-method`, the number of rows in a single vertical merge should not exceed the `virtual-list-props.buffer` (10 by default), otherwise rows near the top edge of that merged block may be misaligned while scrolling. Horizontal merges are not affected.

---

```vue
<template>
  <a-table
    :columns="columns"
    :data="data"
    :row-selection="rowSelection"
    :virtual-list-props="{ height: 400 }"
    :pagination="false"
    :scroll="{ x: 1000 }"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 140
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

const data = reactive(Array(1000).fill(null).map((_, index) => ({
  key: String(index),
  name: `User ${index + 1}`,
  address: '32 Park Road, London',
  email: `user.${index + 1}@example.com`
})));

const rowSelection = {
  type: 'checkbox',
  showCheckedAll: true
};
</script>
```
