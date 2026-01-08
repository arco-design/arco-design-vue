```yaml
title:
  zh-CN: 最多展示标签数量
  en-US: Max Tags
```

## zh-CN

设置最多展示标签数量。

---

## en-US

Set the maximum number of display labels.

---

```vue
<template>
<a-space direction="vertical" size="large">
  <a-input-tag :default-value="['one','two','three','four']" :style="{width:'380px'}" placeholder="Please Enter" :max-tag-count="3" allow-clear/>
  <a-input-tag :default-value="['one','two','three','four']" :style="{width:'380px'}" placeholder="Please Enter" :max-tag-count="{count:3, showPopover:true}" allow-clear/>
</a-space>
</template>
```
