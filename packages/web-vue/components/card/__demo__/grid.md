```yaml
title:
  zh-CN: 网络型内嵌卡片
  en-US: Card Grid
```

## zh-CN

通过 `Card.Grid` 来使用卡片内容区隔模式。

---

## en-US

Use `Card.Grid` to use the card content segmentation mode.

---

```vue
<template>
  <a-card :bordered="false" :style="{ width: '100%' }">
    <a-card-grid
      v-for="(_, index) in new Array(7)"
      :key="index"
      :hoverable="index % 2 === 0"
      :style="{ width: '25%' }"
    >
      <a-card
        class="card-demo"
        title="Arco Card"
        :bordered="false"
      >
        <template #extra>
          <a-link>More</a-link>
        </template>
        <p :style="{ margin: 0 }">
          {{ index % 2 === 0 ? 'Card allow to hover' : 'Card content' }}
        </p>
      </a-card>
    </a-card-grid>
  </a-card>
</template>
<style scoped>
.card-demo {
  width: 100%;
}
.card-demo :deep(.arco-card-header) {
  border: none;
}
</style>
```
