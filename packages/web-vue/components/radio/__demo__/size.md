```yaml
title:
  zh-CN: 按钮类型单选框组的尺寸
  en-US: Button Radio Group Size
```

## zh-CN

按钮类型的单选框组分为 `mini`、`small`、`medium`、`large` 四种尺寸。

---

## en-US

The radio buttons of the button type have four sizes of `mini`, `small`, `medium`, and `large`.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-radio-group type="button" size="mini">
      <a-radio value="Beijing">Beijing</a-radio>
      <a-radio value="Shanghai">Shanghai</a-radio>
      <a-radio value="Guangzhou">Guangzhou</a-radio>
      <a-radio value="Shenzhen">Shenzhen</a-radio>
    </a-radio-group>
    <a-radio-group type="button" size="small">
      <a-radio value="Beijing">Beijing</a-radio>
      <a-radio value="Shanghai">Shanghai</a-radio>
      <a-radio value="Guangzhou">Guangzhou</a-radio>
      <a-radio value="Shenzhen">Shenzhen</a-radio>
    </a-radio-group>
    <a-radio-group type="button">
      <a-radio value="Beijing">Beijing</a-radio>
      <a-radio value="Shanghai">Shanghai</a-radio>
      <a-radio value="Guangzhou">Guangzhou</a-radio>
      <a-radio value="Shenzhen">Shenzhen</a-radio>
    </a-radio-group>
    <a-radio-group type="button" size="large">
      <a-radio value="Beijing">Beijing</a-radio>
      <a-radio value="Shanghai">Shanghai</a-radio>
      <a-radio value="Guangzhou">Guangzhou</a-radio>
      <a-radio value="Shenzhen">Shenzhen</a-radio>
    </a-radio-group>
  </a-space>
</template>
```
