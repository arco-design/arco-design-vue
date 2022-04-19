```yaml
title:
  zh-CN: 布局模式
  en-US: Layouts
```

## zh-CN

有水平排列、垂直排列、行内水平排列、行内垂直排列四种布局模式。

---

## en-US

There are four layout modes: horizontal arrangement, vertical arrangement, horizontal arrangement in a row, and vertical arrangement in a row.

---

```vue
<template>
  <a-descriptions :data="data" title="User Info (horizontal)" bordered/>
  <a-descriptions :data="data" title="User Info (inline-horizontal)" layout="inline-horizontal" bordered/>
  <a-descriptions :data="data" title="User Info (vertical)" layout="vertical" bordered/>
  <a-descriptions :data="data" title="User Info (inline-vertical)" layout="inline-vertical" bordered/>
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
