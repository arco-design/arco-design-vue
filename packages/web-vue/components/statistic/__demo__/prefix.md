```yaml
title:
  zh-CN: 自定义前缀&后缀
  en-US: Custom prefix & suffix
```

## zh-CN

通过 `prefix` 和 `suffix` 插槽可以添加前后缀。

---

## en-US

The prefix and suffix can be added through the `prefix` and `suffix` slots.

---

```vue
<template>
  <a-space size="large">
    <a-statistic title="New Users" :value="125670" show-group-separator >
      <template #suffix>
        <icon-arrow-rise />
      </template>
    </a-statistic>
    <a-statistic title="User Growth Rate" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
      <template #prefix>
        <icon-arrow-rise />
      </template>
      <template #suffix>%</template>
    </a-statistic>
  </a-space>
</template>
```
