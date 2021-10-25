```yaml
title:
  zh-CN: 可伸缩侧边栏
  en-US: Retractable Sidebar
```

## zh-CN

可以用鼠标进行拖拽放大缩小的侧边栏，需要用到的参数：`resizeDirections`。

---

## en-US

By `resizeDirections`, you can use the mouse to drag the sidebar to zoom in and out.

---

```vue
<template>
  <div class="layout-demo">
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider :resize-directions="['right']">
          Sider
        </a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}


.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
  height: 64px;
  background-color: var(--color-primary-light-4);
}

.layout-demo :deep(.arco-layout-sider) {
  width: 206px;
  background-color: var(--color-primary-light-3);
  min-width: 150px;
  max-width: 500px;
  height: 200px;
}

.layout-demo :deep(.arco-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>
```
