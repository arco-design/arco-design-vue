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
  <a-space size="large" align="end">
    <a-statistic
      title="User Growth Rate"
      :value="50.52"
      :value-from="0"
      :precision="2"
      :start="start"
      animation
    >
      <template #prefix>
        <icon-arrow-rise />
      </template>
      <template #suffix>%</template>
    </a-statistic>
    <a-statistic
      title="Car speed per hour"
      :value="0"
      :value-from="60"
      :start="start"
      :animation-duration="5000"
      animation
    >
      <template #prefix>
        <icon-dashboard />
      </template>
      <template #suffix>km/h</template>
    </a-statistic>
    <a-button type="primary" @click="start=true">Start</a-button>
  </a-space>
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
