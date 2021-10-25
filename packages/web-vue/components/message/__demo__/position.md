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
    <a-button @click="()=>this.$message.info({content:'This is an info message!'})">Top Message</a-button>
    <a-button @click="()=>this.$message.info({content:'This is an info message!',position:'bottom'})">Bottom Message</a-button>
  </a-space>
</template>
```
