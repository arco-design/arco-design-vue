```yaml
title:
  zh-CN: 无边框卡片
  en-US: No Border
```

## zh-CN

设置 `bordered` 为 `false` 来使用无边框卡片。

---

## en-US

Set `bordered` to `false` to use borderless cards.

---

```vue
<template>
  <div
    :style="{
      display: 'flex',
      width: '100%',
      boxSizing: 'border-box',
      padding: '40px',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card :style="{ width: '360px' }" title="Arco Card" :bordered="false">
      <template #extra>
        <a-link>More</a-link>
      </template>
      Card content
      <br />
      Card content
    </a-card>
    <a-card
      :style="{ width: '360px', marginLeft: '24px' }"
      title="Hover me"
      hoverable
      :bordered="false"
    >
      <template #extra>
        <a-link>More</a-link>
      </template>
      Card content
      <br />
      Card content
    </a-card>
  </div>
</template>
```
