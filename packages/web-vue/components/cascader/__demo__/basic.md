```yaml
title:
  zh-CN: 基本使用
  en-US: Basic Usage
```

## zh-CN

级联选择器的基本用法。

---

## en-US

The basic usage of cascader.

---

```vue
<template>
  <a-space>
    <a-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." />
    <a-cascader :options="options" default-value="datunli" expand-trigger="hover" :style="{width:'320px'}" placeholder="Please select ..." />
  </a-space>
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
  }
}
</script>
```
