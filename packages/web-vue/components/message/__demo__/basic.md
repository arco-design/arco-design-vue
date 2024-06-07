```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

全局提示的基本用法。

---

## en-US

Basic usage of message.

---

```vue
<template>
  <a-button @click="handleClick">Info Message</a-button>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';

function handleClick(){
  Message.info({
    content:'This is an info message!',
    closable: true,
  });
}
</script>
```
