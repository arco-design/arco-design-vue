```yaml
title:
  zh-CN: 头像组
  en-US: Group
```

## zh-CN

使用 `Avatar.Group` 可以使用头像组功能，可通过 `size` 指定头像的大小。

---

## en-US

Use `Avatar.Group` to group a list of avatars. `size` can be used to specify the size of each avatar..

---

```vue
<template>
  <a-space :size="32">
    <a-avatar-group>
      <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
      <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
      <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
      <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
      <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
    </a-avatar-group>

    <a-avatar-group :size="24">
      <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
      <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
      <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
      <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
      <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
    </a-avatar-group>

    <a-avatar-group :size="24" :max-count="3">
      <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
      <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
      <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
      <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
      <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
    </a-avatar-group>
  </a-space>
</template>
```
