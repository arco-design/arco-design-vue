```yaml
title:
  zh-CN: 全局提示的位置
  en-US: Position
```

## zh-CN

全局提示有 2 种不同的弹出位置，分别为顶部和底部。

---

## en-US

The prompt has 2 different pop-up positions, namely the top and the bottom.

---

```vue
<template>
  <a-space>
    <a-button @click="handleShowTopMessage">Top Message</a-button>
    <a-button @click="handleShowBottomMessage">Bottom Message</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleShowTopMessage = () => {
  Message.info({ content: 'This is an info message!' });
};

const handleShowBottomMessage = () => {
  Message.info({
    content: 'This is an info message!',
    position: 'bottom',
  });
};
</script>
```
