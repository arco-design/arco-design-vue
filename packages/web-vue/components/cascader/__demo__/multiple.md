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
  <a-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." multiple/>
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
