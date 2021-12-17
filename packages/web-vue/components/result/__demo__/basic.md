```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

展示结果状态。

---

## en-US

Show the result status.

---

```vue
<template>
  <a-result title="This is title content" subtitle="This is subtitle content">
    <template #extra>
      <a-space>
        <a-button type="secondary">Again</a-button>
        <a-button type="primary">Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>
```
