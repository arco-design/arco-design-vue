```yaml
title:
  zh-CN: 警告状态
  en-US: Warning
```

## zh-CN

展示警告状态。

---

## en-US

Show warning status.

---

```vue
<template>
  <a-result status="warning" title="This is title content">
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
