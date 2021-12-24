```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

通过鼠标或者键盘输入范围内的标准数值。

---

## en-US

Use the mouse or keyboard to enter the standard value within the range.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-number v-model="value" :style="{width:'320px'}" placeholder="Please Enter" class="input-demo" :min="10" :max="100"/>
    <a-input-number :style="{width:'320px'}" placeholder="Please Enter" class="input-demo" :min="10" :max="100"/>
    <a-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="500" class="input-demo" disabled/>
  </a-space>
</template>

<script>
export default {
  data(){
    return {
      value:15
    }

  }
}
</script>
```
