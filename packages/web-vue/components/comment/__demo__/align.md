```yaml
title:
  zh-CN: 对齐
  en-US: Alignment
```

## zh-CN

通过 `align` 属性可以设置 `datetime` 和 `actions` 的对齐方式.

---

## en-US

Alignment of datetime and actions.

---

```vue
<template>
  <a-comment author="Balzac" datetime="1 hour" align="right">
    <template #actions>
      <span class="action" key="heart" @click="onLikeChange">
        <span v-if="like">
          <IconHeartFill :style="{ color: '#f53f3f' }" />
        </span>
        <span v-else>
          <IconHeart />
        </span>
        {{ 83 + (like ? 1 : 0) }}
      </span>
      <span class="action" key="star" @click="onStarChange">
        <span v-if="star">
          <IconStarFill style="{ color: '#ffb400' }" />
        </span>
        <span v-else>
          <IconStar />
        </span>
        {{ 3 + (star ? 1 : 0) }}
      </span>
      <span class="action" key="reply">
        <IconMessage /> Reply
      </span>
    </template>
    <template #avatar>
      <a-avatar>
        <img
          alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b8659bfc202d44c49aad938b95884e7a~tplv-uwbnlip3yd-image.image"
        />
      </a-avatar>
    </template>
    <template #content>
      <div>
        A design is a plan or specification for the construction of an object or
        system or for the implementation of an activity or process, or the
        result of that plan or specification in the form of a prototype, product
        or process.
      </div>
    </template>
  </a-comment>
</template>

<script>
import {
  IconHeart,
  IconMessage,
  IconStar,
  IconStarFill,
  IconHeartFill,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconHeart,
    IconMessage,
    IconStar,
    IconStarFill,
    IconHeartFill,
  },
  data: () => {
    return {
      like: false,
      star: false,
    };
  },
  methods: {
    onStarChange() {
      this.star = !this.star;
    },
    onLikeChange() {
      this.like = !this.like;
    },
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
