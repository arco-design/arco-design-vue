```yaml
title:
  zh-CN: 带图标的页签
  en-US: Icon Tab
```

## zh-CN

带有图标的标签页。

---

## en-US

Tab page with icons.

---

```vue
<template>
  <a-tabs>
    <a-tab-pane key="1">
      <template #title>
        <icon-calendar/> Tab 1
      </template>
      Content of Tab Panel 1
    </a-tab-pane>
    <a-tab-pane key="2">
      <template #title>
        <icon-clock-circle/> Tab 2
      </template>
      Content of Tab Panel 2
    </a-tab-pane>
    <a-tab-pane key="3">
      <template #title>
        <icon-user/> Tab 3
      </template>
      Content of Tab Panel 3
    </a-tab-pane>
  </a-tabs>
</template>
```
