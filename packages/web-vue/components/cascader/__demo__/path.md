```yaml
title:
  zh-CN: 路径模式
  en-US: path mode
```

## zh-CN

`modelValue` 使用路径作为值。

---

## en-US

`modelValue` uses the path as the value.

---

```vue
<template>
  <a-space>
    <a-cascader :options="options" :style="{width:'320px'}" @change="change"  placeholder="Please select ..." path-mode />
    <a-cascader :options="options" :default-value="[['beijing','chaoyang','datunli']]" :style="{width:'320px'}"
                @change="change" placeholder="Please select ..." path-mode
    />
  </a-space>
</template>

<script>
export default {
  methods:{
    change(path){
      console.log(path)
    }
  },
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
