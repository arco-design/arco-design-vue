```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

头像的基础使用。如果头像是文字的话，会自动调节字体大小，来适应头像框。

---

## en-US

The basic use of avatars. If the avatar is text, the font size will be automatically adjusted to fit the avatar.

---

```vue
<template>
  <a-space size="large">
    <a-avatar>A</a-avatar>
    <a-avatar :style="{ backgroundColor: '#3370ff' }">
      <IconUser />
    </a-avatar>
    <a-avatar :style="{ backgroundColor: '#14a9f8' }">Arco</a-avatar>
    <a-avatar :style="{ backgroundColor: '#00d0b6' }">Design</a-avatar>
    <a-avatar>
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fbbdefc1702398f2f394c57270f7f727.png~tplv-uwbnlip3yd-png.png"
      />
    </a-avatar>
  </a-space>
</template>

<script>
import { IconUser } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconUser },
};
</script>
```
