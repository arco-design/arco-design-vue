```yaml
title:
  zh-CN: 标签文本对齐
  en-US: Align Label Text
```

## zh-CN

标签文本可以设置左对齐右对齐，也可以设置垂直的排列方式。

---

## en-US

The label text can be left-aligned and right-aligned, or it can be arranged vertically.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-descriptions :data="data" title="User Info" align="right" />
    <a-descriptions :data="data" title="User Info" :align="{ label: 'right' }" />
    <a-descriptions :data="data" title="User Info" layout="inline-vertical" />
  </a-space>
</template>

<script>
export default {
  setup() {
    const data = [{
      label: 'Name',
      value: 'Socrates',
    }, {
      label: 'Mobile',
      value: '123-1234-1234',
    }, {
      label: 'Residence',
      value: 'Beijing'
    }, {
      label: 'Hometown',
      value: 'Beijing',
    }, {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing'
    }];

    return {
      data
    }
  },
}
</script>
```
