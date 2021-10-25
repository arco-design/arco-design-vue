```yaml
title:
  zh-CN: 更新内容
  en-US: Update content
```

## zh-CN

更新消息内容，通过设置 `duration` 属性可以重置定时器。

---

## en-US

Update the message content and reset the timer by setting the `duration` property.

---

```vue
<template>
  <a-button @click="handleClick">Update Info Message</a-button>
</template>

<script>
export default {
  data() {
    return {
      index: 0
    }
  },
  methods: {
    handleClick() {
      this.$message.info({
        id: 'myInfo',
        content: `This is an info message ${this.$data.index++}`,
        duration: 2000
      })
    }
  }
};
</script>
```
