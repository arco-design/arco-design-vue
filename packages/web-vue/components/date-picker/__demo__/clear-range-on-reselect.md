```yaml
title:
  zh-CN: 重新选择范围时清空
  en-US: Clear on reselect
```

## zh-CN

`clear-range-on-reselect` 开启后，重新点选范围会先清空上一段范围，再从新的起点开始选择。

---

## en-US

When `clear-range-on-reselect` is enabled, reselecting a range clears the previous range first.

---

```vue
<template>
  <a-space direction="vertical">
    <div>默认行为（保留已有范围）</div>
    <a-range-picker style="width: 360px" />

    <div>开启 clear-range-on-reselect</div>
    <a-range-picker style="width: 360px" clear-range-on-reselect />
  </a-space>
</template>
```
