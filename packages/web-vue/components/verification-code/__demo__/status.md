```yaml
title:
  zh-CN: 不同状态
  en-US: Different status
```

## zh-CN

禁用状态、只读状态、错误状态。

---

## en-US

Disabled, readonly, error status.

---

```vue
<template>
  <a-space direction="vertical">
    <a-space>
      <a-typography-text style="width: 80px">Disabled:</a-typography-text>
      <a-verification-code defaultValue="123456" style="width: 300px" disabled />
    </a-space>
    <a-space>
      <a-typography-text  style="width: 80px">Readonly:</a-typography-text>
      <a-verification-code defaultValue="123456" style="width: 300px" readonly />
    </a-space>
    <a-space>
      <a-typography-text style="width: 80px">Error:</a-typography-text>
      <a-verification-code defaultValue="123456" style="width: 300px" error />
    </a-space>
  </a-space>
</template>
```
