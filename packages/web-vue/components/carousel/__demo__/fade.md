```yaml
title:
  zh-CN: 渐隐切换
  en-US: Animation Fade
```

## zh-CN

指定 `animation` 为 `fade` 使用渐隐切换效果。

---

## en-US

Set `animation=fade` to use fade transition effect.

---

```vue
<template>
  <a-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :auto-play="true"
    animation-name="fade"
    show-arrow="never"
  >
    <a-carousel-item v-for="image in images">
      <img
        :src="image"
        :style="{
          width: '100%',
          transform: 'translateY(-60px)',
        }"
      />
    </a-carousel-item>
  </a-carousel>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae45672685c4be6a297acc7848eab56~tplv-uwbnlip3yd-image.image',
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a5eb077f42834139ad7ac17563056664~tplv-uwbnlip3yd-image.image',
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5c030fe27c0e467a9a7d62c36ae4805b~tplv-uwbnlip3yd-image.image',
      ],
    };
  },
};
</script>
```
