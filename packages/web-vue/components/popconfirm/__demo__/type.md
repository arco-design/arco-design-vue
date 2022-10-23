```yaml
title:
  zh-CN: 确认框类型
  en-US: Type
```

## zh-CN

通过 `type` 属性可以设置确认框类型。

---

## en-US

The type of the confirmation box can be set via the `type` property.

---

```vue
<template>
  <a-space>
    <a-popconfirm content="Are you sure you want to delete?" type="info">
      <a-button>Click To Delete</a-button>
    </a-popconfirm>
    <a-popconfirm content="Are you sure you want to delete?" type="success">
      <a-button>Click To Delete</a-button>
    </a-popconfirm>
    <a-popconfirm content="Are you sure you want to delete?" type="warning">
      <a-button>Click To Delete</a-button>
    </a-popconfirm>
    <a-popconfirm content="Are you sure you want to delete?" type="error">
      <a-button>Click To Delete</a-button>
    </a-popconfirm>
  </a-space>
</template>
```
