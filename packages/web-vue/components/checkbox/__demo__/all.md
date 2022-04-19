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
    <a-checkbox :model-value="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">Check All
    </a-checkbox>
    <a-checkbox-group v-model="data" @change="handleChange">
      <a-checkbox value="1">Option 1</a-checkbox>
      <a-checkbox value="2">Option 2</a-checkbox>
      <a-checkbox value="3">Option 3</a-checkbox>
    </a-checkbox-group>
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const indeterminate = ref(false)
    const checkedAll = ref(false)
    const data = ref([])

    const handleChangeAll = (value) => {
      indeterminate.value = false;
      if (value) {
        checkedAll.value = true;
        data.value = ['1', '2', '3']
      } else {
        checkedAll.value = false;
        data.value = []
      }
    }

    const handleChange = (values) => {
      if (values.length === 3) {
        checkedAll.value = true
        indeterminate.value = false;
      } else if (values.length === 0) {
        checkedAll.value = false
        indeterminate.value = false;
      } else {
        checkedAll.value = false
        indeterminate.value = true;
      }
    }

    return {
      indeterminate,
      checkedAll,
      data,
      handleChangeAll,
      handleChange
    }
  },
}
</script>
```
