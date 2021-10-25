```yaml
title:
  zh-CN: 附加内容
  en-US: Extra
```

## zh-CN

通过 `extra` 插槽可以自定义额外显示内容。

---

## en-US

The extra display content can be customized through the `extra` slot.

---

```vue
<template>
  <a-tabs>
    <template #extra>
      <a-button>Action</a-button>
    </template>
    <a-tab-pane key="1" title="Tab 1">
      Content of Tab Panel 1
    </a-tab-pane>
    <a-tab-pane key="2" title="Tab 2">
      Content of Tab Panel 2
    </a-tab-pane>
    <a-tab-pane key="3" title="Tab 3">
      Content of Tab Panel 3
    </a-tab-pane>
  </a-tabs>
</template>
```
