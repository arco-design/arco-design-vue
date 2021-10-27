```yaml
title:
  zh-CN: 更灵活的内容展示
  en-US: Meta
```

## zh-CN

使用 `Card.Meta` 支持更加灵活的内容（封面、头像、 标题、描述信息）

---

## en-US

Use `Card.Meta` to support more flexible content (cover, avatar, title, description)

---

```vue
<template>
  <a-card hoverable :style="{ width: '360px' }">
    <template #cover>
      <div
        :style="{
          height: '204px',
          overflow: 'hidden',
        }"
      >
        <img
          :style="{ width: '100%', transform: 'translateY(-20px)' }"
          alt="dessert"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
        />
      </div>
    </template>
    <a-card-meta title="Card Title">
      <template #description>
        Card content <br />
        Card content
      </template>
    </a-card-meta>
  </a-card>
</template>
```
