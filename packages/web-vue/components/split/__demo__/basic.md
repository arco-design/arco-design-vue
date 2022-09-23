```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```

## zh-CN

将一个面板分割成两个可以调整宽度或高度的两部分。用`direction`控制分割方向。

---

## en-US

Divide a panel into two parts with adjustable width or height. Use `direction` to control the direction of the split.

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
      v-model:size="size"
      min="80px"
    >
      <template #first>
        <a-typography-paragraph>Left</a-typography-paragraph>
      </template>
      <template #second>
        <a-typography-paragraph>Right</a-typography-paragraph>
      </template>
    </a-split>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 0.5
    }
  }
}
</script>
```
