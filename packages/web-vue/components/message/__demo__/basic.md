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

<script>
export default {
  methods: {
    handleClick() {
      this.$message.info('This is an info message')
    }
  }
};
</script>
```
