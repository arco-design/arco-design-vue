```yaml
title:
  zh-CN: 全选
  en-US: Check All
```

## zh-CN

在实现全选的功能时，可以通过 `indeterminate` 属性展示半选效果。

---

## en-US

When implementing the function of selecting all, you can display the half-selection effect through the indeterminate property.

---

```vue
<template>
  <a-space direction="vertical">
    <a-checkbox :model-value="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">Check All</a-checkbox>
    <a-checkbox-group v-model="data" @change="handleChange">
      <a-checkbox value="1">Option 1</a-checkbox>
      <a-checkbox value="2">Option 2</a-checkbox>
      <a-checkbox value="3">Option 3</a-checkbox>
    </a-checkbox-group>
  </a-space>
</template>

<script>
export default {
  data() {
    return {
      indeterminate: false,
      checkedAll: false,
      data: [],
    }
  },
  methods: {
    handleChangeAll(value) {
      this.$data.indeterminate = false;
      if (value) {
        this.$data.checkedAll = true;

        this.$data.data = ['1', '2', '3']
      } else {
        this.$data.checkedAll = false;
        this.$data.data = []
      }
    },
    handleChange(values) {
      if (values.length === 3) {
        this.$data.checkedAll = true
        this.$data.indeterminate = false;
      } else if (values.length === 0) {
        this.$data.checkedAll = false
        this.$data.indeterminate = false;
      } else {
        this.$data.checkedAll = false
        this.$data.indeterminate = true;
      }
    }
  }
}
</script>
```
