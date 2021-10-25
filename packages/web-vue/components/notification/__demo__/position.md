```yaml
title:
  zh-CN: 全局提示的位置
  en-US: Position
```

## zh-CN

通知提醒框的显示位置。

---

## en-US

The display position of the notification.

---

```vue
<template>
  <a-space>
    <a-button @click="()=>this.$notification.info({content:'This is an info message!'})">Top Right Message</a-button>
    <a-button @click="()=>this.$notification.info({content:'This is an info message!',position:'topLeft'})">Top Left
      Message
    </a-button>
    <a-button @click="()=>this.$notification.info({content:'This is an info message!',position:'bottomRight'})">Bottom
      Right Message
    </a-button>
    <a-button @click="()=>this.$notification.info({content:'This is an info message!',position:'bottomLeft'})">Bottom
      Left Message
    </a-button>
  </a-space>
</template>
```
