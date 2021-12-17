```yaml
title:
  zh-CN: 限制上传数量
  en-US: Limit
```

## zh-CN

通过 `limit` 限制上传的最大数量。超出后上传按钮会隐藏.

---

## en-US

Limit the maximum number of uploaded files.

---

```vue
<template>
  <a-upload multiple action="/" :limit="3" />
</template>
```
