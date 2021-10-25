```yaml
title:
  zh-CN: 允许搜索
  en-US: Allow Search
```

## zh-CN

通过设置 `allow-search` 让输入框支持搜索功能。

---

## en-US

Make the input box support search function by setting `allow-search`.

---

```vue
<template>
  <a-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." allow-search/>
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
              value: 'Beijing',
              label: 'Beijing',
              children: [
                {
                  value: 'chaoyang',
                  label: 'Chaoyang',
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
                },
                {
                  value: 'xicheng',
                  label: 'Xicheng',
                },
                {
                  value: 'haidian',
                  label: 'Haidian',
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
