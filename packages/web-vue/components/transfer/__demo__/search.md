```yaml
title:
  zh-CN: 搜索
  en-US: Search
```

## zh-CN

通过设置 `show-search` 来使用带搜索框的穿梭框，可以自定义搜索函数。

---

## en-US

You can customize the search function by setting `show-search` to use the shuttle box with search box.

---

```vue
<template>
  <a-transfer
    show-search
    :data="data"
    :default-value="value"
    :source-input-search-props="{
      placeholder:'source item search'
    }"
    :target-input-search-props="{
      placeholder:'target item search'
    }"
  />
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
