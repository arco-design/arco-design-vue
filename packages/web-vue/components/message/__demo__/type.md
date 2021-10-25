```yaml
title:
  zh-CN: 消息类型
  en-US: Message Type
```

## zh-CN

全局提示有 5 种不同的类型，分别为：`info`, `success`, `warning`, `error`, `normal`。

---

## en-US

There are 5 different types of global prompts, namely: `info`, `success`, `warning`, `error`, `normal`.

---

```vue
<template>
  <a-space>
    <a-button @click="()=>this.$message.info('This is an info message!')">Info Message</a-button>
    <a-button @click="()=>this.$message.success('This is a success message!')" status="success">Success Message</a-button>
    <a-button @click="()=>this.$message.warning('This is a warning message!')" status="warning">Warning Message</a-button>
    <a-button @click="()=>this.$message.error('This is an error message!')" status="danger">Error Message</a-button>
  </a-space>
</template>
```
