```yaml
title:
  zh-CN: 带边框样式
  en-US: Bordered Descriptions
```

## zh-CN

带边框和背景颜色的列表。

---

## en-US

List with border and background color.

---

```vue
<template>
  <a-descriptions :data="data" title="User Info" bordered/>
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
