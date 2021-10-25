```yaml
title:
  zh-CN: 状态点
  en-US: Status
```

## zh-CN

设置 `status`，可以得到不同的状态点。`normal - 正常` `processing - 进行中` `success - 成功` `warning - 提醒` `danger - 危险`。

---

## en-US

Different status.

---

```vue
<template>
  <a-space size="large" direction="vertical">
    <a-space size="large">
      <a-badge status="normal" />
      <a-badge status="processing" />
      <a-badge status="success" />
      <a-badge status="warning" />
      <a-badge status="danger" />
    </a-space>
    <a-space size="large">
      <a-badge status="normal" text="Normal" />
      <a-badge status="processing" text="Processing" />
      <a-badge status="success" text="Success" />
      <a-badge status="warning" text="Warning" />
      <a-badge status="danger" text="Danger" />
    </a-space>
  </a-space>
</template>
```
