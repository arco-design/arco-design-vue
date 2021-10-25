```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

简单地成组展示多个只读字段，一般用于详情页的信息。

---

## en-US

Simply display multiple read-only fields in groups, which are generally used for information on the details page.

---

```vue
<template>
  <a-descriptions :data="data" title="User Info" layout="inline-horizontal"/>
</template>

<script>
export default {
  data() {
    return {
      data: [{
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
      }]
    }
  }
}
</script>
```
