```yaml
title:
  zh-CN: 长按钮
  en-US: Long Button
```

## zh-CN

通过设置 `long` 属性，使按钮的宽度跟随容器的宽度。

---

## en-US

By setting the `long` property, the width of the button follows the width of the container.

---

```vue
<template>
  <a-space class="wrapper" direction="vertical">
    <a-button type="primary" long>Primary</a-button>
    <a-button long>Default</a-button>
    <a-button type="dashed" long>Dashed</a-button>
    <a-button type="outline" long>Outline</a-button>
    <a-button type="text" long>Text</a-button>
  </a-space>
</template>

<style scoped lang="less">
.wrapper{
  width: 400px;
  padding: 20px;
  border: 1px solid var(~'--color-border');
  border-radius: 4px;
}
</style>
```
