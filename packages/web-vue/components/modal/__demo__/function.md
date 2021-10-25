```yaml
title:
  zh-CN: 函数调用
  en-US: Call By Function
```

## zh-CN

通过函数的方式使用对话框。

---

## en-US

Use the modal by function.

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$modal.info({
        title: 'Info Title',
        content: 'This is an info message'
      });
    }
  }
}
</script>
```
