```yaml
title:
  zh-CN: 嵌套面板
  en-US: Nested panels
```

## zh-CN

面板多层嵌套。

---

## en-US

Panels are nested at multiple levels.

---

```vue
<template>
  <a-collapse :default-active-key="['1', 2]" destroy-on-hide>
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="1">
      <a-collapse :default-active-key="['1.1']" destroy-on-hide>
        <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="1.1">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </a-collapse-item>
        <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="1.2">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </a-collapse-item>
      </a-collapse>
    </a-collapse-item>
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." :key="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
  </a-collapse>
</template>
```
