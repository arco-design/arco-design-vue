```yaml
title:
  zh-CN: 嵌套评论
  en-US: Nested comments
```

## zh-CN

评论可以嵌套使用

---

## en-US

Comments can be nested.

---

```vue
<template>
  <a-comment
    author="Socrates"
    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b8659bfc202d44c49aad938b95884e7a~tplv-uwbnlip3yd-image.image"
    content="Comment body content."
    datetime="1 hour"
  >
    <template #actions>
      <span class="action"> <IconMessage /> Reply </span>
    </template>
    <a-comment
      author="Balzac"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b8659bfc202d44c49aad938b95884e7a~tplv-uwbnlip3yd-image.image"
      content="Comment body content."
      datetime="1 hour"
    >
      <template #actions>
        <span class="action"> <IconMessage /> Reply </span>
      </template>
      <a-comment
        author="Austen"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a83a4f9b13464f609922b2c41eca552b~tplv-uwbnlip3yd-image.image"
        content="Reply content"
        datetime="1 hour"
      >
        <template #actions>
          <span class="action"> <IconMessage /> Reply </span>
        </template>
      </a-comment>
      <a-comment
        author="Plato"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d25cec706293400989fde1eddfeb9cf0~tplv-uwbnlip3yd-image.image"
        content="Reply content"
        datetime="1 hour"
      >
        <template #actions>
          <span class="action"> <IconMessage /> Reply </span>
        </template>
      </a-comment>
    </a-comment>
  </a-comment>
</template>

<script>
import { IconHeart, IconMessage, IconStar } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconHeart,
    IconMessage,
    IconStar,
  },
};
</script>
<style scoped>
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
```
