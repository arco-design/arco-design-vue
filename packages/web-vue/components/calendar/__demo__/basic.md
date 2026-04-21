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
  select: {{ displayValue }}
</template>

<script>
import { computed, ref } from 'vue';

export default {
  setup() {
    const value = ref(new Date('2023-01-01'));
    const displayValue = computed(() => value.value.toISOString());

    return {
      value,
      displayValue,
    }
  },
}
</script>
```
