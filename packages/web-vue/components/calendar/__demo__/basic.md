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
  <a-calendar v-model="value" />
  select: {{value}}
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(new Date());

    return {
      value
    }
  },
}
</script>
```
