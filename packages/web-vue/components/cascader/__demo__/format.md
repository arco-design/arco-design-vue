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
  <a-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." :format-label="format" />
</template>

<script>
export default {
  data() {
    return {
      options: [
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
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'xicheng',
              label: 'XiCheng',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
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
              value: 'shanghaishi',
              label: 'Shanghai',
              children: [
                {
                  value: 'huangpu',
                  label: 'Huangpu',
                },
              ],
            },
          ],
        },
      ]
    }
  },
  methods: {
    format(options) {
      const labels = options.map(option => option.label)
      return labels.join('-')
    }
  }
}
</script>
```
