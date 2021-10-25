```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

鼠标移入或点击，弹出气泡，可对浮层上元素进行操作，承载复杂内容和操作。

---

## en-US

Move the mouse in or click to pop up bubbles, which can operate on the elements on the floating layer, and carry complex content and operations.

---

```vue
<template>
  <a-popover title="Title">
    <a-button>Hover</a-button>
    <template #content>
      <p>Here is the text content</p>
      <p>Here is the text content</p>
    </template>
  </a-popover>
</template>
```
