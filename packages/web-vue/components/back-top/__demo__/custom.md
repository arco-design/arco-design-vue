```yaml
title:
  zh-CN: 自定义按钮
  en-US: Custom Button
```

## zh-CN

可以自定义返回按钮。

---

## en-US

You can customize the back button.

---

```vue
<template>
  <div class="wrapper">
    <ul id="custom-demo">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <a-back-top target-container="#custom-demo" :style="{position:'absolute'}" >
      <a-button>UP</a-button>
    </a-back-top>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  position: relative;

  ul {
    height: 200px;
    overflow-y: auto;

    li {
      line-height: 30px;
    }
  }
}
</style>
```
