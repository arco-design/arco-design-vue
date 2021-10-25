```yaml
title:
  zh-CN: 允许清除
  en-US: Allow Clear
```

## zh-CN

允许清除。

---

## en-US

Allow clear.

---

```vue
<template>
  <a-cascader :options="options" :style="{width:'320px'}" placeholder="Please select ..." allow-clear/>
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
