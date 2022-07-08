```yaml
title:
  zh-CN: 自定义样式
  en-US: Custom style
```

## zh-CN

自定义面板样式。

---

## en-US

custom panels styles.

---

```vue
<template>
  <a-collapse :default-active-key="['1', 2]" :bordered="false">
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." :style="customStyle" key="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." :style="customStyle" :key="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." :style="customStyle" key="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
  </a-collapse>
</template>

<script>
export default {
  setup() {
    const customStyle = {
      borderRadius: '6px',
      marginBottom: '18px',
      border: 'none',
      overflow: 'hidden',
    }

    return {
      customStyle
    }
  }
}
</script>
```
