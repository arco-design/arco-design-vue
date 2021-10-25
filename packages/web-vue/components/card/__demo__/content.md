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
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ee428f1389b4291b1f9bbd82b24105d~tplv-uwbnlip3yd-image.image"
          />
        </a-avatar>
        <a-typography-text>Username</a-typography-text>
      </span>
      <a-link>More</a-link>
    </div>
  </a-card>
</template>
```
