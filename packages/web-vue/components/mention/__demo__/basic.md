```yaml
title:
  zh-CN: 基本使用
  en-US: Basic Usage
```

## zh-CN

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

---

## en-US

Used to mention someone or something in the input, often used for posting, chatting or commenting.

---

```vue
<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <a-mention :data="data" placeholder="enter something" @search="search" />
    <a-mention :data="data" type="textarea" placeholder="enter something" @search="search" />
  </a-space>
</template>
<script setup>
import { ref } from 'vue'

const data = ref([])
const search = (value) => value &&
  (data.value = ['Bytedance', 'Bytedesign', 'Bytenumner']
    .filter(item => item.toLowerCase().indexOf(value.toLowerCase()) > -1))
</script>
```
