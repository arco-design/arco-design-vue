```yaml
title:
  zh-CN: 前缀与后缀
  en-US: Prefix & Suffix
```

## zh-CN

通过指定 `prefix` 和 `suffix` 插槽来在输入框内添加前缀和后缀。

---

## en-US

Add prefix and suffix in the input box by specifying the `prefix` and `suffix` slots.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-number :style="{width:'320px'}" placeholder="Please enter something" allow-clear>
      <template #prefix>
        <icon-user />
      </template>
    </a-input-number>
    <a-input-number :style="{width:'320px'}" placeholder="Please enter something" allow-clear hide-button>
      <template #suffix>
        <icon-info-circle />
      </template>
    </a-input-number>
  </a-space>
</template>
```
