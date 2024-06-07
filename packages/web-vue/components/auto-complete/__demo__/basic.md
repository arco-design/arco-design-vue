```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

自动补全的基础用法

---

## en-US

Basic usage of auto-complete

---

```vue
<template>
  <a-auto-complete :data="data" @search="handleSearch" :style="{width:'360px'}" placeholder="please enter something"/>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);

const handleSearch = (value) => {
  if (value) {
    data.value = [...Array(5)].map((_, index) => `${value}-${index}`)
    console.log(data.value)
  } else {
    data.value = []
  }
}
</script>
```
