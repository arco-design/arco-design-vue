```yaml
title:
  zh-CN: 加载中状态
  en-US: Loading
```

## zh-CN

通过设置 `loading` 可以让链接处于加载中状态。处于加载中状态的链接不会触发点击事件。

---

## en-US

The link can be in the loading state by setting `loading`. The link in the loading state will not trigger the `click` event.


---

```vue
<template>
  <a-space>
    <a-link loading>Link</a-link>
    <a-link :loading="loading1" @click="handleClick1">Link</a-link>
    <a-link :loading="loading2" @click="handleClick2">
      <template #icon>
        <icon-edit />
      </template>
      Link
    </a-link>
  </a-space>
</template>

<script>
import { ref } from 'vue';
import { IconEdit } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconEdit,
  },
  setup() {
    const loading1 = ref(false);
    const loading2 = ref(false);

    const handleClick1 = () => {
      loading1.value = true;
      setTimeout(() => {
        loading1.value = false;
      }, 3000);
    }
    const handleClick2 = () => {
      loading2.value = true;
      setTimeout(() => {
        loading2.value = false;
      }, 3000);
    }

    return {
      loading1,
      loading2,
      handleClick1,
      handleClick2,
    };
  }
}
</script>
```
