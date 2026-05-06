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
  <a-space direction="vertical" size="large">
    <a-cascader
      :options="options"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      path-mode
      @change="handleChange"
    />
    <a-cascader
      :options="options"
      :default-value="[['beijing', 'chaoyang', 'datunli']]"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      path-mode
      @change="handleChange"
    />
  </a-space>
</template>

<script setup lang="ts">
const handleChange = (path) => {
  console.log(path);
};

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
</script>
```
