```yaml
title:
  zh-CN: 进度条大小
  en-US: Progress Size
```

## zh-CN

通过 `size` 设置进度条的大小

---

## en-US

Set the size of the progress bar through `size`

---

```vue
<template>
  <a-space direction="vertical" size="large" :style="{width:'50%'}">
    <a-radio-group v-model="size" type="button">
      <a-radio value="small">Small</a-radio>
      <a-radio value="medium">Medium</a-radio>
      <a-radio value="large">Large</a-radio>
    </a-radio-group>
    <a-progress :size="size" :percent="0.2"/>
    <a-progress status='warning' :size="size" :percent="0.2"/>
    <a-progress status='danger' :size="size" :percent="0.2"/>
    <a-space>
      <a-progress type="circle" :size="size" :percent="0.2"/>
      <a-progress type="circle" status='warning' :size="size" :percent="0.2"/>
      <a-progress type="circle" status='danger' :size="size" :percent="0.2"/>
    </a-space>
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      size: ref('medium')
    }
  }
}
</script>
```
