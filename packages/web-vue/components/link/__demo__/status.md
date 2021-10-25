```yaml
title:
  zh-CN: 链接的状态
  en-US: Status
```

## zh-CN

链接的状态分为 `normal` - **正常（默认）**、`success` - **成功**、`warning` - **警告**、`danger` - **危险**四种。

---

## en-US

The link status is divided into four types: `normal` (default), `success`, `warning` and `danger`.

---

```vue
<template>
  <a-space direction="vertical">
    <a-space>
      <a-link href="link">Normal Link</a-link>
      <a-link href="link" disabled>Normal Link</a-link>
    </a-space>
    <a-space>
      <a-link href="link" status="success">Success Link</a-link>
      <a-link href="link" status="success" disabled>Success Link</a-link>
    </a-space>
    <a-space>
      <a-link href="link" status="warning">Warning Link</a-link>
      <a-link href="link" status="warning" disabled>Warning Link</a-link>
    </a-space>
    <a-space>
      <a-link href="link" status="danger">Danger Link</a-link>
      <a-link href="link" status="danger" disabled>Danger Link</a-link>
    </a-space>
  </a-space>
</template>
```
