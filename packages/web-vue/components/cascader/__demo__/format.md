```yaml
title:
  zh-CN: 自定义输入框的展示值
  en-US: asdf
```

## zh-CN

利用 `formatLabel` 对显示的内容进行自定义处理。

---

## en-US

Use `formatLabel` to customize the displayed content.

---

```vue

<template>
  <a-cascader :options="options" default-value="datunli" :style="{width:'320px'}" placeholder="Please select ..." :format-label="format" />
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

    const format = (options) => {
      const labels = options.map(option => option.label)
      return labels.join('-')
    }

    return {
      options,
      format
    }
  },
}
</script>
```
