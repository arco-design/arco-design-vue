```yaml
title:
  zh-CN: 滚动条类型
  en-US: Scrollbar Type
```

## zh-CN

设置 `type` 属性改变滚动条类型，`track` 类型会显示滚动条轨道。

---

## en-US

Set the `type` property to change the scrollbar type, the `track` type will display the scrollbar track.

---

```vue
<template>
  <a-scrollbar type="track" style="height:200px;overflow: auto;">
    <div style="height: 2000px;width: 2000px; background-color: var(--color-primary-light-4);">Content</div>
  </a-scrollbar>
</template>

<script>
export default {
}
</script>
```
