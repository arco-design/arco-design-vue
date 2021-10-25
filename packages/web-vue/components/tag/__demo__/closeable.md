```yaml
title:
  zh-CN: 可关闭标签
  en-US: Closeable
```

## zh-CN

通过 `closable` 属性控制标签是否可关闭。可关闭标签可通过 `close` 事件执行一些关闭后操作，也可通过 `visible` 属性控制标签的显示或隐藏。

---

## en-US

Use the `closable` attribute to control whether the label can be closed. Closable tags can perform some post-closing operations through the `close` event, and the display or hiding of the tags can also be controlled through the `visible` property.

---

```vue
<template>
  <a-space>
    <a-tag closable>Tag</a-tag>
    <a-tag closable>
      <template #icon>
        <icon-star/>
      </template>
      Tag
    </a-tag>
  </a-space>
</template>
```
