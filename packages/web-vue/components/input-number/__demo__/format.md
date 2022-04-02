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
  <a-input-number :style="{width:'320px'}" placeholder="Please Enter" class="input-demo" :default-value="12000" :min="0" :formatter="formatter" :parser="parser"/>
</template>

<script>
export default {
  setup(){
    const formatter = (value) => {
      const values = value.split('.');
      values[0]=values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return values.join('.')
    };

    const parser = (value) => {
      return value.replace(/,/g, '')
    };

    return {
      formatter,
      parser
    }
  },
}
</script>
```
