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

<script setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

const index = ref(0);

function handleClick() {
  Message.info({
    id: 'myInfo',
    content: `This is an info message ${ index.value++ }`,
    duration: 2000,
  });
}
</script>
```
