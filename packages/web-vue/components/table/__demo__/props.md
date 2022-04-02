```yaml
title:
  zh-CN: 表格属性
  en-US: Table Props
```

## zh-CN

这里罗列了一些表格的属性，你可以方便的打开或关闭一些属性，查看它的效果。

---

## en-US

Here is a list of some table attributes, you can easily open or close some of the attributes to view its effects.

---

```vue

<template>
  <a-form layout="inline" :model="form">
    <a-form-item label="Border" field="border">
      <a-switch v-model="form.border" />
    </a-form-item>
    <a-form-item label="Hover" field="hover">
      <a-switch v-model="form.hover" />
    </a-form-item>
    <a-form-item label="stripe" field="stripe">
      <a-switch v-model="form.stripe" />
    </a-form-item>
    <a-form-item label="checkbox" field="checkbox">
      <a-switch v-model="form.checkbox" />
    </a-form-item>
    <a-form-item label="checkAll" field="checkAll">
      <a-switch v-model="rowSelection.showCheckedAll" />
    </a-form-item>
    <a-form-item label="loading" field="loading">
      <a-switch v-model="form.loading" />
    </a-form-item>
    <a-form-item label="tableHeader" field="tableHeader">
      <a-switch v-model="form.tableHeader" />
    </a-form-item>
    <a-form-item label="noData" field="noData">
      <a-switch v-model="form.noData" />
    </a-form-item>
  </a-form>
  <a-table
    :columns="columns"
    :data="form.noData ? [] : data"
    :bordered="form.border"
    :hoverable="form.hover"
    :stripe="form.stripe"
    :loading="form.loading"
    :show-header="form.tableHeader"
    :row-selection="form.checkbox ? rowSelection : undefined"
  />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      border: true,
      borderCell: false,
      hover: true,
      stripe: false,
      checkbox: true,
      loading: false,
      tableHeader: true,
      noData: false
    });

    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true
    });

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
      form,
      rowSelection,
      columns,
      data
    }
  },
}
</script>
```
