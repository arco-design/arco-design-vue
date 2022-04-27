```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

标签页的基本使用方法。

---

## en-US

Basic usage of tab.

---

```vue
<template>
  <a-tabs default-active-key="2">
    <a-tab-pane key="1" title="Tab 1">
      Content of Tab Panel 1
    </a-tab-pane>
    <a-tab-pane key="2" title="Tab 2">
      Content of Tab Panel 2
    </a-tab-pane>
    <a-tab-pane key="3">
      <template #title>Tab 3</template>
      Content of Tab Panel 3
    </a-tab-pane>
  </a-tabs>
</template>
```
