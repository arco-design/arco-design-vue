```yaml
title:
  zh-CN: 尺寸
  en-US: Size
```

## zh-CN

内置 4 个尺寸，`mini - 4px` `small - 8px (默认)` `medium - 16px` `large - 24px`，也支持传数字来自定义尺寸。

---

## en-US

Built-in 4 sizes, `mini-4px` `small-8px (default)` `medium-16px` `large-24px`, and also support to pass numbers to customize the size.

---

```vue
<template>
  <div>
    <div style="marginBottom: 20px">
      <a-radio-group v-model="size" type='button'>
        <a-radio value="mini">mini</a-radio>
        <a-radio value="small">small</a-radio>
        <a-radio value="medium">medium</a-radio>
        <a-radio value="large">large</a-radio>
      </a-radio-group>
    </div>
    <a-space :size="size">
      <a-button type="primary">Item1</a-button>
      <a-button type="primary">Item2</a-button>
      <a-button type="primary">Item3</a-button>
    </a-space>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 'medium',
    }
  }
};
</script>
```
