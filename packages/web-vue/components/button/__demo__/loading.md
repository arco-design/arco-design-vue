```yaml
title:
  zh-CN: 加载中状态
  en-US: Loading Status
```

## zh-CN

通过设置 `loading` 可以让按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。

---

## en-US

The button can be in the loading state by setting `loading`. The button in the loading state will not trigger the `click` event.

---

```vue
<template>
  <a-space>
    <a-button type="primary" loading>Primary</a-button>
    <a-button loading>Default</a-button>
    <a-button type="dashed" loading>Dashed</a-button>
    <a-button type="primary" :loading="loading1" @click="handleClick1">Click Me</a-button>
    <a-button type="primary" :loading="loading2" @click="handleClick2">
      <template #icon>
        <icon-plus />
      </template>
      Click Me
    </a-button>
  </a-space>
</template>

<script>
import { IconPlus } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconPlus
  },
  data() {
    return {
      loading1: false,
      loading2: false
    }
  },
  methods: {
    handleClick1() {
      this.loading1 = !this.loading1;
    },
    handleClick2() {
      this.loading2 = !this.loading2;
    }
  }
}
</script>
```
