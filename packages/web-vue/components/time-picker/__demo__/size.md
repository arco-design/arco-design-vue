```yaml
title:
  zh-CN: 尺寸
  en-US: Size
```

## zh-CN

有四种尺寸可供选择。

---

## en-US

There are four sizes.

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
  <a-time-picker style="width: 194px;" :size="size" />
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

