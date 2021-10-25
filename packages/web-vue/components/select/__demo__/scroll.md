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
    @dropdown-scroll="scroll"
    @dropdown-reach-bottom="reachBottom"
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
  methods: {
    scroll: (e) => {
      console.log('scroll', e)
    },
    reachBottom: (e) => {
      console.log('reach the bottom', e)
    }
  }
}
</script>
```
