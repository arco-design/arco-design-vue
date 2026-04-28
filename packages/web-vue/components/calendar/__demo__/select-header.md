```yaml
title:
  zh-CN: 下拉选择的头部
  en-US: Dropdown Header
```

## zh-CN

除了默认头部切换外，也支持下拉选择头部，更快速定位。

---

## en-US

Besides the default switch header, dropdown header is supported for faster navigation.

---

```vue
<template>
  <div style="width: 100%; overflow: auto">
    <a-calendar :default-value="defaultValue" header-type="select" />
  </div>
</template>

<script>
export default {
  setup() {
    const defaultValue = new Date('2020-04-01');

    return {
      defaultValue,
    };
  },
};
</script>
```
