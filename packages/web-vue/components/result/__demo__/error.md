```yaml
title:
  zh-CN: 错误状态
  en-US: Error
```

## zh-CN

展示错误状态。

---

## en-US

Show error status.

---

```vue
<template>
  <a-result status="error" title="This is title content">
    <template #subtitle>
      This is subtitle content
    </template>

    <template #extra>
      <a-space>
        <a-button type='primary'>Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>
```
