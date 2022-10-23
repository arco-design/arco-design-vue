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
      @click="() => this.$notification.info('This is an info message!')"
    >
      Info
    </a-button>
    <a-button
      type='primary'
      status="success"
      @click="() => this.$notification.success('This is a success message!')"
    >
      Success
    </a-button>
    <a-button
      type='primary'
      status="warning"
      @click="() => this.$notification.warning('This is a warning message!')"
    >
      Warning
    </a-button>
    <a-button
      type='primary'
      status="danger"
      @click="() => this.$notification.error('This is an error message!')"
    >
      Error
    </a-button>
    <a-button
      type='secondary'
      @click="() => this.$notification.info({
        content: 'This is an error message!',
        showIcon: false
      })"
    >
      Normal
    </a-button>
  </a-space>
</template>
```
