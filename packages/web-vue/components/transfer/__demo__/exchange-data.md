```yaml
title:
  zh-CN: 交换数据
  en-US: Exchange Data
```

## zh-CN

交换左右列表的数据。

---

## en-US

Exchange data of left and right lists.

---

```vue
<template>
  <a-transfer :data="data" :default-value="value" ref="transfer" />
  <br />
  <a-button @click="exchangeData">Exchange Data</a-button>
</template>

<script>
import {ref} from 'vue'
export default {
  setup() {
    const transfer = ref()
    const data = Array(8).fill(undefined).map((_, index) => ({
      value: `option${index + 1}`,
      label: `Option ${index + 1}`
    }));
    const value = ['option1', 'option3', 'option5'];
    const exchangeData = () => {
      transfer.value.exchangeData()
    }
    return {
      data,
      value,
      transfer,
      exchangeData
    }
  },
}
</script>
```
