```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

展示和选择日历

---

## en-US

Display and select calendars

---

```vue
<template>
  <a-space direction="vertical" fill>
    <a-calendar v-model="value" />
    <div>Selected date: {{ value.toDateString() }}</div>
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(new Date('2023-01-01 00:00:00'));

    return {
      value,
    };
  },
};
</script>
```
