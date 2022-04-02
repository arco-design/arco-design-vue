```yaml
title:
  zh-CN: 输入框尺寸
  en-US: Input Size
```


## zh-CN

输入框定义了四种默认尺寸 `mini, small, medium, large` ，分别为 `24px, 28px, 32px, 36px` 。

---

## en-US

The input box defines four default sizes `mini, small, medium, large`, which are `24px, 28px, 32px, 36px` respectively.

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
    <a-input :style="{width:'320px'}" placeholder="Please enter something" :size="size" allow-clear />
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
