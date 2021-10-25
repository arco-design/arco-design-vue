```yaml
title:
  zh-CN: 支持更多内容配置
  en-US: With Actions
```

## zh-CN

`actions` slot 可以用于展示底部按钮组。

---

## en-US

The `actions` slot can be used to display the bottom button group.

---

```vue
<template>
  <a-card :style="{ width: '360px' }">
    <template #actions>
      <span class="icon-hover"> <IconThumbUp /> </span>
      <span class="icon-hover"> <IconShareInternal /> </span>
      <span class="icon-hover"> <IconMore /> </span>
    </template>
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
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bb4d85edbb3a40b2b9540f7aec6cac17~tplv-uwbnlip3yd-image.image"
        />
      </div>
    </template>
    <a-card-meta title="Card Title" description="This is the description">
      <template #avatar>
        <div
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
          <a-avatar :size="24" :style="{ marginRight: '8px' }">
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ee428f1389b4291b1f9bbd82b24105d~tplv-uwbnlip3yd-image.image"
            />
          </a-avatar>
          <a-typography-text>Username</a-typography-text>
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
import {
  IconThumbUp,
  IconShareInternal,
  IconMore,
} from '@arco-design/web-vue/es/icon';

export default {
  components: { IconThumbUp, IconShareInternal, IconMore },
};
</script>
<style scoped>
.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}
.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}
</style>
```
