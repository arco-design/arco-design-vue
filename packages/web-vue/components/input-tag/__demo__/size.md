```yaml
title:
  zh-CN: 输入框尺寸
  en-US: Input Size
```

## zh-CN

输入框分为 `mini`、`small`、`medium`、`large` 四种尺寸。

---

## en-US

The input box is divided into four sizes: `mini`, `small`, `medium`, and `large`.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-radio-group type="button" v-model="size">
      <a-radio value="mini">mini</a-radio>
      <a-radio value="small">small</a-radio>
      <a-radio value="medium">medium</a-radio>
      <a-radio value="large">large</a-radio>
    </a-radio-group>
    <a-input-tag :default-value="['one']" :style="{width:'320px'}" placeholder="Please enter something" :size="size" allow-clear />
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const size = ref('medium');

    return {
      size
    }
  },
}
</script>
```
