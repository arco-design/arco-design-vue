```yaml
title:
  zh-CN: 多个触发方式
  en-US: Triggers
```

## zh-CN

通过`trigger`传入数组，可以设置多个触发方式。

---

## en-US


---

```vue
<template>
  <a-trigger :trigger="['click','hover','focus']">
    <a-input placeholder="Click/Hover/Focus on me" />
    <template #content>
      <div class="demo-trigger">
        <a-empty />
      </div>
    </template>
  </a-trigger>
</template>

<style scoped>
.demo-trigger {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
```
