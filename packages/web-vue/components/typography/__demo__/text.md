```yaml
title:
  zh-CN: 文本
  en-US: Text
```

## zh-CN

不同样式的文本以及超链接组件。

---

## en-US

Different styles of text.

---

```vue
<template>
<a-space direction="vertical" :size="10">
    <a-typography-text>
      Arco Design
    </a-typography-text>
    <a-typography-text type="secondary">
      Secondary
    </a-typography-text>
    <a-typography-text type="primary">
      Primary
    </a-typography-text>
    <a-typography-text type="success">
      Success
    </a-typography-text>
    <a-typography-text type="warning">
      Warning
    </a-typography-text>
    <a-typography-text type="danger">
      Danger
    </a-typography-text>
    <a-typography-text bold>
      Bold
    </a-typography-text>
    <a-typography-text disabled>
      Disabled
    </a-typography-text>
    <a-typography-text mark>
      Mark
    </a-typography-text>
    <a-typography-text underline>
      Underline
    </a-typography-text>
    <a-typography-text delete>
      Line through
    </a-typography-text>
    <a-typography-text code>
      Code snippet
    </a-typography-text>
  </a-space>
</template>
```
