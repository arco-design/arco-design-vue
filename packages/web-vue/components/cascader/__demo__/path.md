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
      ]
    }
  }
}
</script>
```
