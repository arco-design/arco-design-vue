```yaml
title:
  zh-CN: 简洁卡片
  en-US: Only Content
```

## zh-CN

卡片可以只有内容区域。

---

## en-US

A card that only has a content area.

---

```vue
<template>
  <a-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }"
    >
      <span
        :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
      >
        <a-avatar
          :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
          :size="28"
        >
          A
        </a-avatar>
        <a-typography-text>Username</a-typography-text>
      </span>
      <a-link>More</a-link>
    </div>
  </a-card>
</template>
```
