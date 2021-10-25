```yaml
title:
  zh-CN: 跟随鼠标显示弹出框
  en-US: Follow mouse
```

## zh-CN

设置`align-point`属性，可以使弹出层出现在鼠标位置。

---

## en-US

---

```vue
<template>
  <a-trigger class="demo-point" trigger="click" align-point>
    <div class="demo-point-trigger">
      <div>Click Me</div>
    </div>
    <template #content>
      <a-empty />
    </template>
  </a-trigger>
</template>

<style lang="less">
.demo-point-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: var(--color-fill-2)
}

.demo-point {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);

  &-wrapper {
    display: block;
  }
}
</style>
```
