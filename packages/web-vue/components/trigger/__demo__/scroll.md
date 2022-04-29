```yaml
title:
  zh-CN: 滚动容器
  en-US: Scroll Container
```

## zh-CN

通过设置 `update-at-scroll` 监听容器的滚动。

---

## en-US

Monitor the scrolling of the container by setting `update-at-scroll`.

---

```vue
<template>
  <div :style="{height:'100px',overflowY:'scroll'}">
    <div :style="{height:'200px'}">
      <a-trigger trigger="click" update-at-scroll>
        <a-button :style="{marginTop:'80px'}">Click Me</a-button>
        <template #content>
          <div class="demo-basic">
            <a-empty />
          </div>
        </template>
      </a-trigger>
    </div>
  </div>
</template>

<style scoped>
.demo-basic {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
```
