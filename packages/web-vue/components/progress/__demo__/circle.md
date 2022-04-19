```yaml
title:
  zh-CN: 环形进度条
  en-US: Circle Progress
```

## zh-CN

设置 `type="circle"` 将会展示环形进度条。

---

## en-US

Setting `type="circle"` will show a circular progress bar.

---

```vue

<template>
  <a-space size="large">
    <a-progress type="circle" :percent="percent" />
    <a-progress type="circle" status='warning' :percent="percent" />
    <a-progress type="circle" status='danger' :percent="percent" />
    <a-progress type="circle" status='success' :percent="percent" />
  </a-space>
  <div :style="{marginTop:'20px'}">
    <a-slider v-model="percent" :max="1" :step="0.1" :style="{width: '150px'}" />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const percent = ref(0.2);

    return {
      percent
    }
  },
}
</script>
```
