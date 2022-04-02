```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

这个例子展示了触发器的最基础的使用。触发器默认是没有弹出框的样式的。以下示例均为官网添加的样式。

---

## en-US

---

```vue
<template>
  <a-space>
    <a-trigger position="top" auto-fit-position :unmount-on-close="false">
      <span>Hover Me</span>
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
    <a-trigger trigger="click" :unmount-on-close="false">
      <a-button>Click Me</a-button>
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
    <a-trigger trigger="focus">
      <a-input placeholder="Focus on me" />
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
  </a-space>
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
