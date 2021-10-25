```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

自动补全的基础用法

---

## en-US

Basic usage of auto-complete

---

```vue
<template>
  <a-auto-complete :data="data" @search="handleSearch" :style="{width:'360px'}" placeholder="please enter something"/>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    handleSearch(value) {
      if (value) {
        this.data = [...Array(5)].map((_, index) => `${value}-${index}`)
        console.log(this.data)
      } else {
        this.data = []
      }
    }
  }
}
</script>
```
