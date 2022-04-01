```yaml
title:
  zh-CN: 基本使用
  en-US: Basic Usage
```

## zh-CN

数据穿梭框的基本用法。

---

## en-US

Basic usage of the transfer.

---

```vue
<template>
  <a-transfer :data="data" :default-value="value" />
</template>

<script>
export default {
  setup() {
    const data = Array(8).fill(undefined).map((_, index) => ({
      value: `option${index + 1}`,
      label: `Option ${index + 1}`
    }));
    const value = ['option1', 'option3', 'option5'];

    return {
      data,
      value
    }
  },
}
</script>
```
