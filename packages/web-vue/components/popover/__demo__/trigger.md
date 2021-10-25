```yaml
title:
  zh-CN: 触发方式
  en-US: Trigger
```

## zh-CN

通过设置 `trigger`，可以指定不同的触发方式。

---

## en-US

By setting `trigger`, you can specify different trigger methods.

---

```vue
<template>
  <a-space>
    <a-popover title="Title">
      <a-button>Hover Me</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
    <a-popover title="Title" trigger="click">
      <a-button>Click Me</a-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>
  </a-space>
</template>
```
