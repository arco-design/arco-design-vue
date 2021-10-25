```yaml
title:
  zh-CN: 底部固定
  en-US: Fixed Bottom
```

## zh-CN

当页面滚动或浏览器窗口改变时，元素向下滚动到距底部一定距离时固定。

---

## en-US

When the page scrolls or the browser window changes, the element is fixed when it scrolls down to a certain distance from the bottom.

---

```vue
<template>
  <a-affix :offsetBottom="120">
    <a-button type="primary">120px to affix bottom</a-button>
  </a-affix>
</template>
```
