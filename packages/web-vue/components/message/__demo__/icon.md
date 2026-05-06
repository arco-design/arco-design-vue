```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom icon
```

## zh-CN

设置 `icon` 来自定义图标。

---

## en-US

Set `icon` to customize the icon.

---

```vue
<template>
  <a-button @click="handleClick">Info Message</a-button>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';

const handleClick = () => {
  Message.info({
    content: 'This is an info message!',
    icon: () => h(IconFaceSmileFill),
  });
};
</script>
```
