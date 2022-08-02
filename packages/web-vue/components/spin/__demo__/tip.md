```yaml
title:
  zh-CN: 添加描述文案
  en-US: Add tip
```

## zh-CN

通过 `tip` 属性添加描述文案。

---

## en-US

$END$

---

```vue
<template>
  <a-row :gutter="20">
    <a-col :span="12">
      <a-spin tip="This may take a while..." loading>
      <a-card title="Arco Card">
        ByteDance's core product, Toutiao ('Headlines'), is a content platform in China and around
        the world. Toutiao started out as a news recommendation engine and gradually evolved into
        a platform delivering content in various formats.
      </a-card>
    </a-spin>
    </a-col>
    <a-col :span="12">
      <a-spin loading>
        <template #tip>
          <a-avatar-group :size="24" :max-count="3">
            <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
            <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
            <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
            <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
            <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
          </a-avatar-group>
        </template>
        <a-card title="Arco Card">
          ByteDance's core product, Toutiao ('Headlines'), is a content platform in China and around
          the world. Toutiao started out as a news recommendation engine and gradually evolved into
          a platform delivering content in various formats.
        </a-card>
      </a-spin>
    </a-col>
  </a-row>
</template>
```
