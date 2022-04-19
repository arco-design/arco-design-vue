```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

## zh-CN

虚拟列表的使用方法。

---

## en-US

How to use the virtual list.

---

```vue

<template>
  <a-select :style="{width:'320px'}" :options="options" placeholder="Please select ..." :virtual-list-props="{height:200}" />
</template>

<script>
export default {
  setup() {
    const options = Array(1000).fill(null).map((_, index) => `Option ${index}`);

    return {
      options
    }
  },
}
</script>
```
