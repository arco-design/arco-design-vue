```yaml
title:
  zh-CN: 自定义关闭按钮
  en-US: Custom close button
```

## zh-CN

需要设置 `closable: true`，自定义元素使用 `closeIconElement`，仅图标使用 `closeIcon` (会有 `hover` 样式)。

---

## en-US

Need to set up `closable: true`, Custom elements use the `closeIconElement`, only icon use the `closeIcon` (There will be a `hover` style).

---

```vue
<template>
  <a-space>
    <a-button type="primary" @click="handleNotification">
      Open Notification
    </a-button>
    <a-button type="primary" status="danger" @click="handleNotification2">
      Open Notification
    </a-button>
  </a-space>
</template>

<script lang="jsx">
import { Notification, Button } from '@arco-design/web-vue';
import { IconCloseCircle } from '@arco-design/web-vue/es/icon';

export default {
  setup() {
    const handleNotification = () => {
      Notification.info({
        title:'Notification',
        content:'This is a notification!',
        closable: true,
        closeIcon: <IconCloseCircle />
      })
    }

    const handleNotification2 = () => {
      Notification.error({
        title:'Notification',
        content:'This is a notification!',
        closable: true,
        closeIconElement: <Button size="mini">Close</Button>
      })
    }

    return { handleNotification, handleNotification2 }
  }
}
</script>
```
