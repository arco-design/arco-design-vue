```yaml
title:
  zh-CN: 消息类型
  en-US: Notification Type
```

## zh-CN

通知提醒框的消息类型。

---

## en-US

The message type of the notification.

---

```vue
<template>
  <a-space>
    <a-button @click="()=>this.$notification.info('This is an info message!')">Info Message</a-button>
    <a-button @click="()=>this.$notification.success('This is a success message!')" status="success">Success Message</a-button>
    <a-button @click="()=>this.$notification.warning('This is a warning message!')" status="warning">Warning Message</a-button>
    <a-button @click="()=>this.$notification.error('This is an error message!')" status="danger">Error Message</a-button>
  </a-space>
</template>
```
