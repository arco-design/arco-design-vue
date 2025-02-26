```yaml
title:
  zh-CN: 多选模式
  en-US: Multiple
```

## zh-CN

通过设置 `multiple` 开启多选模式。

---

## en-US

Enable multiple selection mode by setting `multiple`.

---

```vue
<template>
  <a-space direction="vertical">
    <a-cascader :options="options" :default-value="['datunli']" :style="{width:'320px'}" placeholder="Please select ..." multiple/>
    <a-cascader :options="options" :default-value="['datunli']" :style="{width:'320px'}" placeholder="Please select ..." multiple :max-tag-count="2"/>
    <a-cascader :options="options" :default-value="['datunli']" :style="{width:'320px'}" placeholder="Please select ..." multiple :max-tag-count="{count: 2, showPopover: true}"/>
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
