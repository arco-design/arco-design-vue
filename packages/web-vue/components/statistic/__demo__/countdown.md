```yaml
title:
  zh-CN: 倒计时组件
  en-US: Countdown
```

## zh-CN

倒计时组件 `countdown` 的基本使用方法。

---

## en-US

The basic usage of the countdown component `countdown`.

---

```vue

<template>
  <a-space direction="vertical">
    <a-button @click="start=true">Start</a-button>
    <a-countdown title="Countdown" :value="Date.now() + 2 * 3600 * 1000" :now="Date.now()" :start="start" />
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
