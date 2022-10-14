```yaml
title:
  zh-CN: 全局提示的位置
  en-US: Position
```

## zh-CN

通知提醒框有 4 种不同的弹出位置，分别为：`左上角`, `右上角 (默认)`, `左下角`, `右下角`。

---

## en-US

Notification has 4 different positions, `Top Left`, `Top Right (default)`, `Bottom Left`, `Bottom Right`.

---

```vue
<template>
  <a-space>
    <a-button type="primary" @click="handleNotification"> Top Right </a-button>
    <a-button type="primary" @click="handleNotificationTopLeft"> Top Left </a-button>
    <a-button type="primary" @click="handleNotificationBottomRight"> Bottom Right </a-button>
    <a-button type="primary" @click="handleNotificationBottomLeft"> Bottom Left </a-button>
  </a-space>
</template>

<script>
import { Notification } from '@arco-design/web-vue';

export default {
  setup() {
    const handleNotification = () => {
      Notification.info({
        title: 'Title',
        content: 'This is a Notification!',
      })
    }

    const handleNotificationTopLeft = () => {
      Notification.info({
        title: 'Title',
        content: 'This is a Notification!',
        position: "topLeft"
      })
    }

    const handleNotificationBottomRight = () => {
      Notification.info({
        title: 'Title',
        content: 'This is a Notification!',
        position: 'bottomRight'
      })
    }

    const handleNotificationBottomLeft = () => {
      Notification.info({
        title: 'Title',
        content: 'This is a Notification!',
        position: "bottomLeft"
      })
    }

    return {
      handleNotification,
      handleNotificationTopLeft,
      handleNotificationBottomRight,
      handleNotificationBottomLeft
    }
  }
}
</script>
```
