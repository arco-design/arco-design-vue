```yaml
title:
  zh-CN: 允许搜索
  en-US: Allow Search
```

## zh-CN

通过设置 `allow-search` ，可以让选择器支持对选项的搜索，配合 `filter-option` 可以自定义搜索。

---

## en-US

By setting `allow-search`, you can make the selector support searching for options, and you can customize the search with `filter-option`.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-select :style="{width:'320px'}" placeholder="Please select ..." allow-search>
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
      <a-option>Shenzhen</a-option>
      <a-option>Chengdu</a-option>
      <a-option>Wuhan</a-option>
    </a-select>
    <a-select :style="{width:'320px'}" placeholder="Please select ..." :allow-search="{ retainInputValue: true }">
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
      <a-option>Shenzhen</a-option>
      <a-option>Chengdu</a-option>
      <a-option>Wuhan</a-option>
    </a-select>
    <a-select :options="options" :style="{width:'320px'}" :loading="loading" placeholder="Please select ..." multiple
              @search="handleSearch" />
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const options = ref(['Option1', 'Option2', 'Option3']);
    const loading = ref(false);

    const handleSearch = (value) => {
      if (value) {
        loading.value = true;
        window.setTimeout(() => {
          options.value = [`${value}-Option1`, `${value}-Option2`, `${value}-Option3`]
          loading.value = false;
        }, 2000)
      } else {
        options.value = []
      }
    };

    return {
      options,
      loading,
      handleSearch
    }
  },
}
</script>
```
