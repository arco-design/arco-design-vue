```yaml
title:
  zh-CN: 按钮尺寸
  en-US: Button Size
```

## zh-CN

按钮分为 `mini`、`small`、`medium`、`large` 四种尺寸。高度分别为：`24px`、`28px`、`32px`、`36px`。推荐（默认）尺寸为 `medium`。可在不同场景及不同业务需求选择适合尺寸。

---

## en-US

Button is divided into four sizes: `mini`, `small`, `medium`, and `large`. The heights are: `24px`, `28px`, `32px`, `36px`. The recommended (default) size is `medium`. The suitable size can be selected in different scenarios and different business needs.

---

```vue
<template>
  <a-space>
    <a-button type="primary" size="mini">Mini</a-button>
    <a-button type="primary" size="small">Small</a-button>
    <a-button type="primary">Medium</a-button>
    <a-button type="primary" size="large">Large</a-button>
  </a-space>
</template>
```
