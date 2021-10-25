```yaml
title:
  zh-CN: 顶部固定
  en-US: Fixed Top
```

## zh-CN

当页面滚动或浏览器窗口改变时，元素向上滚动到距顶部一定距离时固定。

---

## en-US

When the page scrolls or the browser window changes, the element is fixed when it scrolls up to a certain distance from the top.

---

```vue
<template>
  <a-affix :offsetTop="80">
    <a-button type="primary">80px to affix top</a-button>
  </a-affix>
</template>
```
