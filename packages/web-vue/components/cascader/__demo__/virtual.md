```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

## zh-CN

虚拟列表的使用方法。设置 `virtual-list-props` 后，搜索面板同样会走虚拟滚动；选项数量很大时，过滤会按 `search-delay` 防抖。

---

## en-US

How to use the virtual list. With `virtual-list-props`, the search panel is virtualized as well; filtering is debounced by `search-delay` for large option trees.

---

```vue
<template>
  <a-cascader
    :options="options"
    :style="{ width: '320px' }"
    placeholder="Please select ..."
    :virtual-list-props="{ height: 200 }"
  />
</template>

<script setup lang="ts">
const options = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
        children: [
          {
            value: 'datunli',
            label: 'Datunli',
          },
        ],
      },
      {
        value: 'haidian',
        label: 'Haidian',
      },
      {
        value: 'dongcheng',
        label: 'Dongcheng',
      },
      {
        value: 'xicheng',
        label: 'Xicheng',
        children: [
          {
            value: 'jinrongjie',
            label: 'Jinrongjie',
          },
          {
            value: 'tianqiao',
            label: 'Tianqiao',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: Array(1000)
      .fill(null)
      .map((_, index) => ({
        value: `Option ${index}`,
        label: `Option ${index}`,
      })),
  },
];
</script>
```
