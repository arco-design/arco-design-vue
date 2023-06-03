```yaml
title:
  zh-CN: 自定义选项渲染
  en-US: Custom Item
```

## zh-CN

通过 `item` 插槽自定义选项的渲染内容。

---

## en-US

Customize the rendering content of the options through the `item` slot.

---

```vue

<template>
  <a-transfer :data="data" :default-value="value">
    <template #item="{ label }">
      <icon-up />
      {{ label }}
    </template>
  </a-transfer>
</template>

<script>
export default {
  setup() {
    const data = Array(8).fill(undefined).map((_, index) => {
      return {
        value: `option${index + 1}`,
        label: `Option ${index + 1}`,
        disabled: index === 1
      }
    });
    const value = ['option1', 'option3', 'option5'];

    return {
      data,
      value
    }
  },
}
</script>
```
