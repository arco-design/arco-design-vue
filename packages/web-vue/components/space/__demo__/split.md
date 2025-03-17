```yaml
title:
  zh-CN: 分隔符
  en-US: Split
```

## zh-CN

为相邻子元素设置分隔符。

---

## en-US

Set separators for adjacent child elements.

---

```vue
<template>
  <a-space>
    <template #split>
      <a-divider direction="vertical" :margin="0" />
    </template>
    <a-button type="primary">Item1</a-button>
    <a-tag v-if="show" color='arcoblue'>Tag</a-tag>
    <a-button type="primary">Item2</a-button>
    <a-button type="primary">Item3</a-button>
    <a-switch v-model="show"/>
  </a-space>
  <a-divider />
  <a-space>
    <template #split>
      <a-divider direction="vertical" :margin="0" />
    </template>
    <a-link type="primary">Link1</a-link>
    <a-link type="primary">Link2</a-link>
    <a-link type="primary">Link3</a-link>
  </a-space>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```
