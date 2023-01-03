```yaml
title:
  zh-CN: 更新延迟
  en-US: Update duration
```

## zh-CN

通过指定参数 `id`，可以更新已经存在的通知提醒框。

---

## en-US

Specifying `id` to update the existing notification.

---

```vue
<template>
  <a-button type="primary" @click="handleNotification">
    Open Notification
  </a-button>
</template>

<script lang="jsx">
import { Notification } from '@arco-design/web-vue';

export default {
  setup() {
    const handleNotification = () => {
      Notification.warning({
        id: 'your_id',
        title: 'Ready to update',
        content: 'Will update after 2 seconds...',
        duration: 3000,
      })

      setTimeout(() => {
        Notification.success({
          id: 'your_id',
          title: 'Success',
          content: 'Update success!',
          duration: 3000,
        });
      }, 2000)
    }

    return { handleNotification }
  }
}
</script>
```
