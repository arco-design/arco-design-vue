```yaml
title:
  zh-CN: 步骤错误
  en-US: Error Status
```

## zh-CN

通过设置 `status="error"` 来展示错误状态。

---

## en-US

Display the error status by setting `status="error"`.

---

```vue
<template>
  <a-steps :current="2" status="error">
    <a-step description="This is a description">Succeeded</a-step>
    <a-step description="This is a description">Error</a-step>
    <a-step description="This is a description">Pending</a-step>
  </a-steps>
</template>
```
