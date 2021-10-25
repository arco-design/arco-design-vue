```yaml
title:
  zh-CN: 按钮状态
  en-US: Button Status
```

## zh-CN

按钮的状态分为 `normal` - **正常（默认）**、`success` - **成功**、`warning` - **警告**、`danger` - **危险**四种，可以与按钮类型同时使用。

---

## en-US

The state of button is divided into four types: `normal` - **normal (default)**, `success` - **success**, `warning` - **warning**, `danger` - **danger**, Can be used simultaneously with the button type.

---

```vue
<template>
  <a-space direction="vertical">
    <a-space>
      <a-button type="primary" status="success">Primary</a-button>
      <a-button status="success">Default</a-button>
      <a-button type="dashed" status="success">Dashed</a-button>
      <a-button type="outline" status="success">Outline</a-button>
      <a-button type="text" status="success">Text</a-button>
    </a-space>
    <a-space>
      <a-button type="primary" status="warning">Primary</a-button>
      <a-button status="warning">Default</a-button>
      <a-button type="dashed" status="warning">Dashed</a-button>
      <a-button type="outline" status="warning">Outline</a-button>
      <a-button type="text" status="warning">Text</a-button>
    </a-space>
    <a-space>
      <a-button type="primary" status="danger">Primary</a-button>
      <a-button status="danger">Default</a-button>
      <a-button type="dashed" status="danger">Dashed</a-button>
      <a-button type="outline" status="danger">Outline</a-button>
      <a-button type="text" status="danger">Text</a-button>
    </a-space>
  </a-space>
</template>
```
