```yaml
title:
  zh-CN: 数值动画
  en-US: Animation
```

## zh-CN

通过 `animation` 可以开启数值动画。

---

## en-US

Numerical animation can be turned on through `animation`.

---

```vue
<template>
  <a-statistic title="User Growth Rate" :value="50.52" :precision="2" :value-from="0" :start="start" animation>
    <template #prefix>
      <icon-arrow-rise />
    </template>
    <template #suffix>%</template>
  </a-statistic>
  <a-button @click="start=true">Start</a-button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const start = ref(false);

    return {
      start
    }
  },
}
</script>
```
