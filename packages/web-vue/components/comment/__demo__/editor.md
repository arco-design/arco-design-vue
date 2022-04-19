```yaml
title:
  zh-CN: 回复框
  en-US: Reply Editor
```

## zh-CN

评论框配合回复框使用

---

## en-US

Use with replay

---

```vue
<template>
  <a-comment
    align="right"
    author="Balzac"
    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    content="A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process."
    datetime="1 hour"
  >
    <template #actions>
      <span class="action"> <IconMessage /> Reply </span>
    </template>
    <a-comment
      align="right"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    >
      <template #actions>
        <a-button key="0" type="secondary"> Cancel </a-button>
        <a-button key="1" type="primary"> Reply </a-button>
      </template>
      <template #content>
        <a-input placeholder="Here is you content." />
      </template>
    </a-comment>
  </a-comment>
</template>

<script>
import { IconMessage } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconMessage,
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
