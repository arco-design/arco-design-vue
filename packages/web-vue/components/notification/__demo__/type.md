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
    <a-button
      type='primary'
      @click="() => Notification.info('This is an info message!')"
    >
      Info
    </a-button>
    <a-button
      type='primary'
      status="success"
      @click="() => Notification.success('This is a success message!')"
    >
      Success
    </a-button>
    <a-button
      type='primary'
      status="warning"
      @click="() => Notification.warning('This is a warning message!')"
    >
      Warning
    </a-button>
    <a-button
      type='primary'
      status="danger"
      @click="() => Notification.error('This is an error message!')"
    >
      Error
    </a-button>
    <a-button
      type='secondary'
      @click="() => Notification.info({
        content: 'This is an error message!',
        showIcon: false,
      })"
    >
      Normal
    </a-button>
  </a-space>
</template>

<script setup>
import { Notification } from '@arco-design/web-vue';
</script>
```
