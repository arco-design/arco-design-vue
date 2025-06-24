```yaml
title:
  zh-CN: 多选模式
  en-US: Multiple
```

## zh-CN

通过设置 `multiple` 开启多选模式。设置 checkedStrategy 属性设置数据回显方式（仅在多选模式multiple: true && 非严格模式checkStrictly: false 下生效）。

---

## en-US

Enable multiple selection mode by setting `multiple`. Set the checkedStrategy property to set the data display method (only valid when multiple: true && checkStrictly: false).

---

```vue
<template>
  <a-cascader :options="options" :default-value="['chaoyang']" :style="{width:'320px'}" placeholder="Please select ..." multiple :checkedStrategy="'parent'" />
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
    return {
      options
    }
  },
}
</script>
```
