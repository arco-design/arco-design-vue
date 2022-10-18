```yaml
title:
  zh-CN: 格式化展示值
  en-US: Format
```

## zh-CN

通过 `formatter` 和 `parser` 配合使用可以定义输入框展示值。

---

## en-US

Use `formatter` and `parser` together to define the display value of the input box.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-number
      :style="{width:'320px'}"
      placeholder="Please Enter"
      :default-value="12000"
      :min="0"
      :formatter="formatter1"
      :parser="parser1"
    />
    <a-input-number
      :style="{width:'320px'}"
      placeholder="Please Enter"
      :default-value="2022"
      :min="0"
      :formatter="formatter2"
      :parser="parser2"
    />
  </a-space>
</template>

<script>
export default {
  setup(){
    const formatter1 = (value) => {
      const values = value.split('.');
      values[0]=values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return values.join('.')
    };

    const parser1 = (value) => value.replace(/,/g, '')

    const formatter2 = (value) => {
      const values = value.split('.');

      return values[0].split('').join('-')
    };

    const parser2 = (value) => value.replace(/\-/g, '')

    return {
      formatter1,
      parser1,
      formatter2,
      parser2
    }
  },
}
</script>
```
