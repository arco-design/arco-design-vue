```yaml
title:
  zh-CN: 分页尺寸
  en-US: Pagination Size
```

## zh-CN

分页分为 `mini`、`small`、`medium`、`large` 四种尺寸。

---

## en-US

The pagination is divided into four sizes: `mini`, `small`, `medium`, and `large`.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-radio-group type="button" v-model="size">
      <a-radio value="mini">Mini</a-radio>
      <a-radio value="small">Small</a-radio>
      <a-radio value="medium">Medium</a-radio>
      <a-radio value="large">Large</a-radio>
    </a-radio-group>
    <a-pagination :total="50" :size="size" show-total show-jumper show-page-size />
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
