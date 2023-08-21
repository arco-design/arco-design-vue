```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

## zh-CN

虚拟列表的使用方法。

---

## en-US

How to use the virtual list.

---

```vue

<template>
  <a-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..."
              :virtual-list-props="{height:200}" />
</template>

<script>
export default {
  setup() {
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
        children: Array(1000).fill(null).map((_, index) => {
          return {
            value: `Option ${index}`,
            label: `Option ${index}`
          }
        })
      },
    ];

    return {
      options
    }
  },
}
</script>
```
