```yaml
title:
  zh-CN: 基本使用
  en-US: Basic Usage
```

## zh-CN

基本用法

---

## en-US

Basic usage

---

```vue
<template>
  <a-space>
    <a-color-picker v-model="value" />
    <a-color-picker v-model="value1" />
    <a-color-picker defaultValue="#165DFF" showText disabledAlpha/>
  </a-space>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('')
const value1 = ref('#165DFF')
</script>
```
