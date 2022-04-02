```yaml
title:
  zh-CN: 迷你进度条
  en-US: Mini Progress
```

## zh-CN

设置 `size="mini"` 展示微型进度条。

---

## en-US

Set `size="mini"` to display a miniature progress bar.

---

```vue
<template>
  <a-space size="large" :style="{width: '100%'}">
    <a-progress size="mini" :percent="percent"/>
    <a-progress size="mini" status='warning' :percent="percent"/>
    <a-progress size="mini" status='danger' :percent="percent"/>
    <a-progress size="mini" status='success' :percent="percent"/>
  </a-space>
  <a-space size="large" :style="{width: '100%', marginTop: '20px'}">
    <a-progress type="circle" size="mini" :percent="percent"/>
    <a-progress type="circle" size="mini" status='warning' :percent="percent"/>
    <a-progress type="circle" size="mini" status='danger' :percent="percent"/>
    <a-progress type="circle" size="mini" status='success' :percent="percent"/>
  </a-space>
  <div :style="{marginTop: '20px'}">
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
