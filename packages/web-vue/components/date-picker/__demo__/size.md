```yaml
title:
  zh-CN: 尺寸
  en-US: Size
```

## zh-CN

设置 `size` 可以使用四种尺寸（`mini` `small` `medium` `large`）的输入框。高度分别对应 24px、28px、32px、36px。

---

## en-US

Setting `size` can use four sizes (`mini` `small` `medium` `large`). The height corresponds to 24px, 28px, 32px, 36px.

---

```vue
<template>
  <div style="margin-bottom: 20px;">
    <a-radio-group v-model="size" type='button'>
      <a-radio value="mini">mini</a-radio>
      <a-radio value="small">small</a-radio>
      <a-radio value="medium">medium</a-radio>
      <a-radio value="large">large</a-radio>
    </a-radio-group>
  </div>
  <a-date-picker
    :size="size"
    style="width: 254px;"
  />
</template>
<script>
export default {
  data() {
    return {
      size: 'small'
    }
  }
}
</script>
```
