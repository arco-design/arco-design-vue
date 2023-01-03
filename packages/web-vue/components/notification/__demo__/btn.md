```yaml
title:
  zh-CN: 自定义操作按钮
  en-US: Custom action buttons
```

## zh-CN

通过指定 `btn` 字段，可以添加操作按钮。

---

## en-US

You can add operation buttons by specifying the `btn` field.

---

```vue
<template>
  <a-button type="primary" @click="handleNotification">
    Open Notification
  </a-button>
</template>

<script lang="jsx">
import { Notification, Space, Button } from '@arco-design/web-vue';

export default {
  setup() {
    const handleNotification = () => {
      const id = `${Date.now()}`;
      const closeNotification =  Notification.info({
        id,
        title:'Notification',
        content:'This is a notification!',
        duration: 0,
        footer: <Space>
          <Button
            type="secondary"
            size="small"
            onClick={() => Notification.remove(id)}
          >
            Cancel
          </Button>
          <Button type="primary" size="small" onClick={closeNotification}>
            Ok
          </Button>
        </Space>
      })
    }

    return { handleNotification }
  }
}
</script>
```
