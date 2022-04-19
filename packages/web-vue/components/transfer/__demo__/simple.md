```yaml
title:
  zh-CN: 简单模式
  en-US: Simple
```

## zh-CN

通过设置 `simple` 来开启简单模式，点击选项即可移动。

---

## en-US

Turn on the simple mode by setting `simple`, and click the option to move.

---

```vue
<template>
  <a-transfer :data="data" :default-value="value" simple />
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
