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
  <a-select
    :style="{width:'320px'}"
    default-value="Beijing"
    placeholder="Please select ..."
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
  >
    <a-option>Beijing</a-option>
    <a-option>Shanghai</a-option>
    <a-option>Guangzhou</a-option>
    <a-option disabled>Disabled</a-option>
    <a-option>Shenzhen</a-option>
    <a-option>Chengdu</a-option>
    <a-option>Wuhan</a-option>
  </a-select>
</template>

<script>
export default {
  setup() {
    const handleScroll = (ev) => {
      console.log('scroll', ev)
    }
    const handleReachBottom = (ev) => {
      console.log('reach the bottom', ev)
    }

    return {
      handleScroll,
      handleReachBottom
    }
  },
}
</script>
```
