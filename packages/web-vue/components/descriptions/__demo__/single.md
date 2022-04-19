```yaml
title:
  zh-CN: 单列样式
  en-US: Single Row
```

## zh-CN

单列的描述列表样式。

---

## en-US

A single-column description list style.

---

```vue
<template>
  <a-descriptions :data="data" title="User Info" :column="1"/>
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
