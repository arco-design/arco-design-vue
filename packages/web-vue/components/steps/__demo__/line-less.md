```yaml
title:
  zh-CN: 隐藏连接线
  en-US: Line Less
```

## zh-CN

通过设置 `line-less` 可以使用无连接线模式。

---

## en-US

You can use the connectionless mode by setting `line-less`.

---

```vue
<template>
  <a-steps :current="2" line-less>
    <a-step description="This is a description">Succeeded</a-step>
    <a-step description="This is a description">Processing</a-step>
    <a-step description="This is a description">Pending</a-step>
  </a-steps>
</template>
```
