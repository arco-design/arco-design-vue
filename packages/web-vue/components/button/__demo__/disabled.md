```yaml
title:
  zh-CN: 禁用状态
  en-US: Disabled Status
```

## zh-CN

按钮的禁用状态。

---

## en-US

The disabled state of the button.

---

```vue
<template>
  <a-space direction="vertical">
    <a-space>
      <a-button type="primary" disabled>Primary</a-button>
      <a-button disabled>Default</a-button>
      <a-button type="dashed" disabled>Dashed</a-button>
      <a-button type="outline" disabled>Outline</a-button>
      <a-button type="text" disabled>Text</a-button>
    </a-space>
    <a-space>
      <a-button type="primary" status="success" disabled>Primary</a-button>
      <a-button status="success" disabled>Default</a-button>
      <a-button type="dashed" status="success" disabled>Dashed</a-button>
      <a-button type="outline" status="success" disabled>Outline</a-button>
      <a-button type="text" status="success" disabled>Text</a-button>
    </a-space>
    <a-space>
      <a-button type="primary" status="warning" disabled>Primary</a-button>
      <a-button status="warning" disabled>Default</a-button>
      <a-button type="dashed" status="warning" disabled>Dashed</a-button>
      <a-button type="outline" status="warning" disabled>Outline</a-button>
      <a-button type="text" status="warning" disabled>Text</a-button>
    </a-space>
    <a-space>
      <a-button type="primary" status="danger" disabled>Primary</a-button>
      <a-button status="danger" disabled>Default</a-button>
      <a-button type="dashed" status="danger" disabled>Dashed</a-button>
      <a-button type="outline" status="danger" disabled>Outline</a-button>
      <a-button type="text" status="danger" disabled>Text</a-button>
    </a-space>
  </a-space>
</template>
```
