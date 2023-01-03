```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
```

## zh-CN

可以在内容中使用自定义图标。

---

## en-US

You can use custom icons in the content.

---

```vue
<template>
  <a-space direction="vertical">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <icon-home/>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
    </a-breadcrumb>
     <a-breadcrumb>
      <a-breadcrumb-item>
        <icon-home/>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <icon-at />
        Channel
      </a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
    </a-breadcrumb>
  </a-space>
</template>
```
