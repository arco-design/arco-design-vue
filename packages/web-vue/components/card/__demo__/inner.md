```yaml
title:
  zh-CN: 内部卡片
  en-US: Inner Card
```

## zh-CN

卡片中可以嵌套其他卡片组件。

---

## en-US

Other card components can be nested in the card.

---

```vue
<template>
  <a-card title="Arco Card">
    <a-card :style="{ marginBottom: '20px' }" title="Inner Card Title">
      <template #extra>
        <a-link>More</a-link>
      </template>
      Inner Card Content
    </a-card>
    <a-card title="Inner Card Title">
      <template #extra>
        <a-link>More</a-link>
      </template>
      Inner Card Content
    </a-card>
  </a-card>
</template>
```
