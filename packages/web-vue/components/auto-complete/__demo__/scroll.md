```yaml
title:
  zh-CN: 下拉菜单滚动
  en-US: Dropdown Scroll
```

## zh-CN

可以通过 `dropdown-scroll` 监听下拉菜单的滚动事件。或者通过 `dropdown-reach-bottom` 监听下拉菜单滚动到底部的事件。

---

## en-US

You can monitor the scroll event of the drop-down menu through `dropdown-scroll`. Or use `dropdown-reach-bottom` to monitor the event of the drop-down menu scrolling to the bottom.

---

```vue
<template>
  <a-auto-complete
    :data="data"
    :style="{ width: '360px' }"
    placeholder="please enter something"
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const data = ref([...Array(100)].map((_, index) => `option-${index}`))

    const handleScroll = (ev) => {
      console.log('scroll', ev)
    }
    const handleReachBottom = (ev) => {
      console.log('reach the bottom', ev)
    }

    return {
      data,
      handleScroll,
      handleReachBottom
    }
  },
}
</script>
```
