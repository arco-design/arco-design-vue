```yaml
title:
  zh-CN: 远程搜索
  en-US: Remote search
```

## zh-CN

使用 `search` 事件进行远程搜索，并改变选项。

---

## en-US

Use the `search` event to search remotely and change options.

---

```vue

<template>
  <a-space direction="vertical" size="large">
    <a-select :options="options" :style="{width:'320px'}" :loading="loading" placeholder="Please select ..." multiple
              @search="handleSearch" />
    <a-select :options="options" :style="{width:'320px'}" :loading="loading" placeholder="Please select ..." multiple
              @search="handleSearch" :show-extra-options="false" />
  </a-space>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      options: ['Option1', 'Option2', 'Option3']
    }
  },
  methods: {
    handleSearch(value) {
      if (value) {
        this.loading = true;
        window.setTimeout(() => {
          this.options = [`${value}-Option1`, `${value}-Option2`, `${value}-Option3`]
          this.loading = false;
        }, 2000)
      } else {
        this.options = []
      }
    },
  }
}
</script>
```
