```yaml
title:
  zh-CN: 列表元素
  en-US: List Item Meta
```

## zh-CN

使用 `list-item-meta` 组件可快速指定头像、标题、文字。

---

## en-US

Use the `list-item-meta` component to quickly specify the avatar, title, and text.

---

```vue
<template>
  <a-list>
    <a-list-item>
      <a-list-item-meta title="Beijing Bytedance Technology Co., Ltd."
                        description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
      >
        <template #avatar>
          <a-avatar shape="square">
            <img alt="avatar" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b8659bfc202d44c49aad938b95884e7a~tplv-uwbnlip3yd-image.image" />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta title="Beijing Bytedance Technology Co., Ltd."
                        description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
      >
        <template #avatar>
          <a-avatar shape="square">
            <img alt="avatar" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b8659bfc202d44c49aad938b95884e7a~tplv-uwbnlip3yd-image.image" />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta title="Beijing Bytedance Technology Co., Ltd."
                        description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
      >
        <template #avatar>
          <a-avatar shape="square">
            <img alt="avatar" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b8659bfc202d44c49aad938b95884e7a~tplv-uwbnlip3yd-image.image" />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta title="Beijing Bytedance Technology Co., Ltd."
                        description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
      >
        <template #avatar>
          <a-avatar shape="square">
            <img alt="avatar" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b8659bfc202d44c49aad938b95884e7a~tplv-uwbnlip3yd-image.image" />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
```
