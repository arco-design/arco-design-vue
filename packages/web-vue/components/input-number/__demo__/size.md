```yaml
title:
  zh-CN: 四种尺寸
  en-US: Size
```

## zh-CN

设置 `size` 可以使用四种尺寸（`mini`, `small`, `medium`, `large`）的数字输入框。高度分别对应`24px`、`28px`、`32px`、`36px`。

---

## en-US

Setting `size` can use four sizes (`mini`, `small`, `medium`, `large`) number input box. The corresponding heights are `24px`, `28px`, `32px`, and `36px` respectively.

---
```vue
<template>
  <div style="marginBottom: 20px">
    <a-radio-group v-model="size" type='button'>
      <a-radio value="mini">mini</a-radio>
      <a-radio value="small">small</a-radio>
      <a-radio value="medium">medium</a-radio>
      <a-radio value="large">large</a-radio>
    </a-radio-group>
  </div>
  <a-space direction="vertical" size="large">
    <a-input-number :style="{width:'320px'}" placeholder="Please Enter" :size="size" class="input-demo" />
    <a-input-number :style="{width:'320px'}" placeholder="Please Enter" mode="button" :size="size" class="input-demo" />
  </a-space>
</template>

<script>
  export default {
    data() {
      return {
        size: 'medium'
      }
    }
  }
</script>
```
