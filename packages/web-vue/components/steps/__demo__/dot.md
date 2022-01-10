```yaml
title:
  zh-CN: 点状步骤条
  en-US: Dot Steps
```

## zh-CN

通过设置 `type="dot"` ， 可以使用点状的步骤条。此模式没有 small 尺寸。

---

## en-US

By setting `type="dot"`, you can use a dotted step bar. There is no small size for this mode.

---

```vue
<template>
  <a-steps type="dot">
    <a-step>Succeeded</a-step>
    <a-step>Processing</a-step>
    <a-step>Pending</a-step>
  </a-steps>
</template>
```
