```yaml
title:
  zh-CN: 函数调用
  en-US: Call By Function
```

## zh-CN

通过函数的方式使用抽屉。

---

## en-US

Use the drawer by function.

---

```vue
<template>
  <a-button type="primary" @click="handleClick">Open Drawer</a-button>
</template>

<script setup>
import { Drawer } from '@arco-design/web-vue';

const handleClick = () => {
  Drawer.open({
    title: 'Info Title',
    content: 'This is an info message',
    width: 340,
  });
};
</script>
```
