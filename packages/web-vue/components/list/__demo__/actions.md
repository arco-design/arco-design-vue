```yaml
title:
  zh-CN: 增加操作项
  en-US: With Actions
```

## zh-CN

通过 `actions` 来为列表添加操作项。

---

## en-US

Use `actions` to add operation items to the list.

---

```vue
<template>
  <a-list>
    <a-list-item v-for="idx in 4" :key="idx">
      <a-list-item-meta
        title="Beijing Bytedance Technology Co., Ltd."
        description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
      >
        <template #avatar>
          <a-avatar shape="square">
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </a-avatar>
        </template>
      </a-list-item-meta>
      <template #actions>
        <icon-edit />
        <icon-delete />
      </template>
    </a-list-item>
  </a-list>
</template>
```
