```yaml
title:
  zh-CN: 自定义样式
  en-US: Customize style
```

## zh-CN

可以设置 `style` 和 `class` 来定制样式。

---

## en-US

You can set `style` and `class` to customize the style.

---

```vue
<template>
  <a-button type="primary" @click="handleNotification">
    Open Notification
  </a-button>
</template>

<script>
import { Notification } from '@arco-design/web-vue';

export default {
  setup() {
    const handleNotification = () => {
      Notification.info({
        title: 'Notification',
        content: 'This is a notification!',
        closable: true,
        style: { width: '500px' }
      })
    }

    return { handleNotification }
  }
}
</script>
```
