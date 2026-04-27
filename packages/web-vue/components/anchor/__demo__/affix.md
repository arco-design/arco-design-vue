```yaml
title:
  zh-CN: 固钉样式
  en-US: Affix
```

## zh-CN

示例中的锚点会显示在页面右侧。
设置 `affix=true` 时，锚点会以内置固钉模式展示。通过 `affix-style` 可以自定义固钉容器样式。

---

## en-US

The anchor in the example will appear on the right side of the page.
Use `affix=true` to wrap the anchor within Affix component. `affix-style` can be used to set the style of Affix component.

---

```vue
<template>
  <a-anchor :offset-bottom="40" :affix-style="affixStyle">
    <a-anchor-link href="#basic">Basic</a-anchor-link>
    <a-anchor-link href="#static">Static</a-anchor-link>
    <a-anchor-link href="#line-less">LineLess Mode</a-anchor-link>
    <a-anchor-link href="#affix">Affix</a-anchor-link>
    <a-anchor-link href="#boundary">Scroll Boundary</a-anchor-link>
    <a-anchor-link href="#hash">Hash mode</a-anchor-link>
  </a-anchor>
</template>

<script>
export default {
  setup() {
    const affixStyle = {
      position: 'absolute',
      right: '-170px',
      top: '50%',
      zIndex: 1,
    };

    return {
      affixStyle,
    };
  },
};
</script>
```
