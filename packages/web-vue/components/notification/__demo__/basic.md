```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

通知提醒框的基本用法。

---

## en-US

Basic usage of notification.

---

```vue
<template>
  <a-button @click="()=>this.$notification.info({
  title:'Notification',
  content:'This is a notification!'
  })"
  >Open Notification
  </a-button>
</template>
```
