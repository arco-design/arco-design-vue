```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```

## zh-CN

`ResizeBox` 伸缩框组件的基础使用。通过设置 `directions`，可以指定四条边中的哪几条边可以进行伸缩。

---

## en-US

Basic usage of `ResizeBox`. By setting `directions`, you can specify which of the four sides can be stretched.

---

```vue
<template>
  <div>
    <a-resize-box
      :directions="['right', 'bottom']"
      :style="{ width: '500px', minWidth: '100px', maxWidth: '100%', height: '200px', textAlign: 'center' }"
    >
      <a-typography-paragraph>We are building the future of content discovery and creation.</a-typography-paragraph>
      <a-divider />
      <a-typography-paragraph>
        ByteDance's content platforms enable people to enjoy content powered by AI technology. We
        inform, entertain, and inspire people across language, culture and geography.
      </a-typography-paragraph>
      <a-divider>ByteDance</a-divider>
      <a-typography-paragraph>Yiming Zhang is the founder and CEO of ByteDance.</a-typography-paragraph>
    </a-resize-box>
  </div>
</template>
```
