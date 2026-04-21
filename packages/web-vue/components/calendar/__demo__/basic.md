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
  <a-calendar v-model="value">
    <template #content="{ year, month, date }">
      <a-tag v-if="`${year}-${month}-${date}` === '2023-1-1'" color="orange" style="width: 100%; margin-top: 10px; border-radius: 10px;">
        <template #icon>
          <icon-star/>
        </template>
        结婚纪念日
      </a-tag>
    </template>
  </a-calendar>
  select: {{value}}
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(new Date('2023-01-01'));

    return {
      value
    }
  },
}
</script>
```
