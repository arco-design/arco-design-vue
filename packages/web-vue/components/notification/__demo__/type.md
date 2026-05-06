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
    <a-button type="primary" @click="handleShowInfoNotification">
      Info
    </a-button>
    <a-button
      type="primary"
      status="success"
      @click="handleShowSuccessNotification"
    >
      Success
    </a-button>
    <a-button
      type="primary"
      status="warning"
      @click="handleShowWarningNotification"
    >
      Warning
    </a-button>
    <a-button
      type="primary"
      status="danger"
      @click="handleShowErrorNotification"
    >
      Error
    </a-button>
    <a-button type="secondary" @click="handleShowNormalNotification">
      Normal
    </a-button>
  </a-space>
</template>

<script setup lang="ts">
import { Notification } from '@arco-design/web-vue';

const handleShowInfoNotification = () =>
  Notification.info('This is an info message!');
const handleShowSuccessNotification = () =>
  Notification.success('This is a success message!');
const handleShowWarningNotification = () =>
  Notification.warning('This is a warning message!');
const handleShowErrorNotification = () =>
  Notification.error('This is an error message!');
const handleShowNormalNotification = () =>
  Notification.info({
    content: 'This is an error message!',
    showIcon: false,
  });
</script>
```
