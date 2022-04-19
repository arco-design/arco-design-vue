```yaml
title:
  zh-CN: 进度条状态
  en-US: Progress Status
```

## zh-CN

通过 `status` 指定进度条状态

---

## en-US

Specify the status of the progress bar through `status`

---

```vue
<template>
  <a-space direction="vertical" :style="{width: '50%'}">
    <a-progress :percent="percent" />
    <a-progress status='warning' :percent="percent" />
    <a-progress status='danger' :percent="percent" />
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
