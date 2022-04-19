```yaml
title:
  zh-CN: 严格选择模式
  en-US: Check strictly
```

## zh-CN

设置属性 `check-strictly`，开启严格选择模式，点击任何结点都可以选择。多选时将会解除父子节点的关联。

---

## en-US

Set the attribute `check-strictly`, turn on any selectable mode, and click any node to select. Multiple selections will disassociate the parent and child nodes.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-cascader :options="options" default-value="beijing" :style="{width:'320px'}" placeholder="Please select ..." check-strictly />
    <a-cascader :options="options" :default-value="['beijing']" :style="{width:'320px'}" placeholder="Please select ..." multiple check-strictly />
  </a-space>
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
            disabled: true
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
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ];
    return {
      options
    }
  },
}
</script>
```
