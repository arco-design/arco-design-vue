```yaml
title:
  zh-CN: 步骤进度条
  en-US: Steps Progress
```

## zh-CN

通过设置 `steps` 展示步骤进度条。

---

## en-US

Show the step progress bar by setting `steps`.

---

```vue
<template>
  <div :style="{ width: '50%' }">
    <a-progress :steps="3" :percent="0.3" />
    <a-progress :steps="5" status="warning" :percent="1" />
    <a-progress :steps="3" size="small" :percent="0.3" />
  </div>
</template>
```
