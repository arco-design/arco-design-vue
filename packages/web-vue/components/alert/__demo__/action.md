```yaml
title:
  zh-CN: 操作项
  en-US: Action
```

## zh-CN

通过 `#action` 插槽自定义操作按钮

---

## en-US

Customize action buttons via `#action` slot

---

```vue
<template>
  <a-space direction="vertical" size="large" style="width: 100%;">
    <a-alert closable>
      This is an info alert.
      <template #action>
        <a-button size="small" type="primary">Detail</a-button>
      </template>
    </a-alert>
    <a-alert title="Example" closable>
      This is an info alert.
      <template #action>
        <a-button size="small" type="primary">Detail</a-button>
      </template>
    </a-alert>
  </a-space>
</template>
```
