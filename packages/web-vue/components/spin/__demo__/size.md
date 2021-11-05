```yaml
title:
  zh-CN: 不同尺寸
  en-US: Custom Size
```

## zh-CN

设置 `size` 可以得到不同尺寸的加载图标。

---

## en-US

$END$

---

```vue
<template>
  <a-space size="large">
    <a-spin />
    <a-spin :size="28"/>
    <a-spin :size="32"/>
  </a-space>
</template>
```
