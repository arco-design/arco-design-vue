```yaml
title:
  zh-CN: 回退选项
  en-US: Fallback
```

## zh-CN

组件默认会展示在选项中不存在的值，可通过 `fallback` 自定义展示或者关闭

---

## en-US

The component will display the value that does not exist in the options by default, which can be displayed or turned off through `fallback`

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-cascader :options="options" v-model="value" :style="{width:'320px'}" placeholder="Please select ..." multiple />
    <a-cascader :options="options" v-model="value2" :style="{width:'320px'}"
                placeholder="Please select ..." path-mode multiple :fallback="fallback" />
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(['datunli', 'wuhou']);
    const value2 = ref([['beijing', 'chaoyang', 'datunli'], ['sichuan', 'chengdu', 'wuhou']]);
    const fallback = (value) => {
      return value.map(item => item.toUpperCase()).join('-')
    }

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
      options,
      value,
      value2,
      fallback
    }
  },
}
</script>
```
