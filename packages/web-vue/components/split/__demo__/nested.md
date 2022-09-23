```yaml
title:
  zh-CN: 面板分割嵌套
  en-US: Panel Split Nesting
```

## zh-CN

面板分割可以嵌套使用。

---

## en-US

Panel split can be nested.

---

```vue
<template>
<div>
  <a-split :style="{
      height: '200px',
      width: '100%',
      minWidth: '500px',
      border: '1px solid var(--color-border)'
    }"
  >
    <template #first>
      <a-typography-paragraph>Left</a-typography-paragraph>
    </template>
    <template #second>
      <div>
        <a-split direction="vertical" :style="{height: '200px'}">
          <template #first><a-typography-paragraph>Top</a-typography-paragraph></template>
          <template #second><a-typography-paragraph>Bottom</a-typography-paragraph></template>
        </a-split>
      </div>
    </template>
  </a-split>
</div>
</template>
```
