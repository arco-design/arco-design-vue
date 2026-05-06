```yaml
title:
  zh-CN: 可关闭
  en-US: Closeable
```

## zh-CN

设置 `closable` 来显示关闭按钮。

---

## en-US

Set `closable` to show the close button.

---

```vue
<template>
  <a-button @click="handleClick">Closeable Message</a-button>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleClick = () => {
  Message.info({
    content: 'This is an info message!',
    closable: true,
  });
};
</script>
```
