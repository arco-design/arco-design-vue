```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

鼠标移入，气泡出现，鼠标移出，气泡消失。

---

## en-US

When the mouse is moved in, the tooltip appears, and when the mouse is moved out, the tooltip disappears.

---

```vue
<template>
  <a-space>
    <a-tooltip content="This is tooltip content">
      <a-button>Mouse over to display tooltip</a-button>
    </a-tooltip>
    <a-tooltip content="This is a two-line tooltip content.This is a two-line tooltip content.">
      <a-button>Mouse over to display tooltip</a-button>
    </a-tooltip>
  </a-space>
</template>
```
