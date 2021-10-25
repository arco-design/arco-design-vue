```yaml
title:
  zh-CN: 鼠标悬浮样式
  en-US: Hoverable
```

## zh-CN

指定 `hoverable` 来为卡片添加鼠标悬浮样式，同时你可以通过样式覆盖来自定义悬浮样式。

---

## en-US

Set `hoverable` to add a mouse hover style to the card, and you can customize the hover style through style override.

---

```vue
<template>
  <div :style="{ display: 'flex' }">
    <a-card :style="{ width: '360px' }" title="Arco Card" hoverable>
      <template #extra>
        <a-link>More</a-link>
      </template>
      Card content <br />
      Card content
    </a-card>
    <a-card
      class="card-demo"
      title="Custom hover style"
      hoverable
    >
      <template #extra>
        <a-link>More</a-link>
      </template>
      Card content <br />
      Card content
    </a-card>
  </div>
</template>
<style scoped>
.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}
.card-demo:hover {
  transform: translateY(-4px);
}
</style>
```
