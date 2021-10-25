```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```

## zh-CN

典型的页面布局。

---

## en-US

A typical page layout.

---

```vue
<template>
  <div class="layout-demo">
    <a-layout style="height: 400px;">
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
    <br />
    <a-layout style="height: 400px;">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider theme="dark">Sider</a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
    <br />
    <a-layout style="height: 400px;">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-content>Content</a-layout-content>
        <a-layout-sider>Sider</a-layout-sider>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
    <br />
    <a-layout style="height: 400px;">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider style="width: 64px;">Sider</a-layout-sider>
        <a-layout-sider style="width: 206px; margin-left: 1px;">Sider</a-layout-sider>
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
}

.layout-demo :deep(.arco-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>
```
