```yaml
title:
  zh-CN: 交互按钮
  en-US: Trigger Icon
```

## zh-CN

可以通过 `trigger-icon` `trigger-type` 来定制交互按钮，类型有 `mask (遮罩)` 和 `button (按钮)` 两种。

---

## en-US

You can customize the interactive button through `trigger-icon` and `trigger-type`. There are two types: `mask` and `button`.

---

```vue
<template>
  <a-space size="large">
    <a-avatar
      :trigger-icon-style="{ color: '#3491FA' }"
      :auto-fix-font-size="false"
      @click="handleToast"
      :style="{ backgroundColor: '#168CFF' }"
    >
      A
      <template #trigger-icon>
        <IconCamera />
      </template>
    </a-avatar>
    <a-avatar @click="handleToast" :style="{ backgroundColor: '#14C9C9' }">
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </a-avatar>
    <a-avatar
      @click="handleToast"
      shape="square"
      :style="{ backgroundColor: '#FFC72E' }"
    >
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </a-avatar>
    <a-avatar trigger-type="mask">
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </a-avatar>
  </a-space>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { IconCamera, IconEdit, IconUser } from '@arco-design/web-vue/es/icon';

const handleToast = () => {
  Message.info('Uploading...');
};
</script>
```
