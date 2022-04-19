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
    <div>Show selections after search options</div>
    <a-select :style="{width:'320px'}" :loading="loading" placeholder="Please select ..." multiple
              @search="handleSearch" :filter-option="false">
      <a-option v-for="item of options" :value="item">{{item}}</a-option>
    </a-select>
    <div>Hide selections after search options</div>
    <a-select :options="options" :style="{width:'320px'}" :loading="loading" placeholder="Please select ..." multiple
              @search="handleSearch" :filter-option="false" :show-extra-options="false" />
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
