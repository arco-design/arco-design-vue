```yaml
title:
  zh-CN: 双向绑定
  en-US: Two-way binding
```

## zh-CN

通过 `v-model` 实现值的双向绑定

---

## en-US

Support two-way binding through `v-model`

---

```vue
<template>
  <a-space>
    <a-date-picker v-model="value" style="width: 200px;" />
    <a-range-picker v-model="rangeValue" style="width: 300px;" />
  </a-space>
</template>
<script>
export default {
  data() {
    return {
      value: Date.now(),
      rangeValue: [Date.now(), Date.now()],
    }
  }
}
</script>
```
