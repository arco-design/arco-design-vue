```yaml
title:
  zh-CN: 成功状态
  en-US: Success
```

## zh-CN

展示成功状态。

---

## en-US

Show success status.

---

```vue
<template>
  <a-result status="success" title="This is title content" >
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
