```yaml
title:
  zh-CN: 剩余进度条的颜色
  en-US: trackColor
```

## zh-CN

可以通过 trackColor 设置剩余进度条的颜色

---

## en-US

You can use 'trackColor' to set the color of the remaining progress bar.

---

```vue
<template>
  <div :style="{ width: '50%' }">
    <a-progress
      :percent="0.4"
      trackColor="var(--color-primary-light-1)"
      style="margin-bottom: 20px;"
    />
    <a-progress
      :percent="0.4"
      :steps="4"
      trackColor="var(--color-primary-light-1)"
      style="margin-bottom: 20px;"
    />
    <a-progress
      :percent="0.4"
      type="circle"
      trackColor="var(--color-primary-light-1)"
      style="margin-bottom: 20px;"
    />
  </div>
</template>
```
