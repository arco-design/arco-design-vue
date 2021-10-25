```yaml
title:
  zh-CN: 带图标的标签
  en-US: Icon
```

## zh-CN

可通过 `icon` 插槽在标签中加入图标。

---

## en-US

An icon can be added to the tag through the `icon` slot.

---

```vue
<template>
  <a-space>
    <a-tag>
      <template #icon>
        <icon-github/>
      </template>
      Github
    </a-tag>
    <a-tag>
      <template #icon>
        <icon-gitlab/>
      </template>
      Gitlab
    </a-tag>
  </a-space>
</template>
```
