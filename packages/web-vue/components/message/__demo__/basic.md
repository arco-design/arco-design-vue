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

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleClick = () => {
  Message.info('This is an info message');
};
</script>
```
