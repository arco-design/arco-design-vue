```yaml
title:
  zh-CN: 可选中
  en-US: Checkable
```

## zh-CN

通过设置 `checkable` ，可以实现点击选中的效果。

---

## en-US

By setting `checkable`, the effect of selecting can be achieved.

---

```vue
<template>
  <a-space>
    <a-tag checkable>Awesome</a-tag>
    <a-tag checkable color="red" :default-checked="true">Toutiao</a-tag>
    <a-tag checkable color="arcoblue" :default-checked="true">Lark</a-tag>
  </a-space>
</template>
```
