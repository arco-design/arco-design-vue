```yaml
title:
  zh-CN: 卡片化
  en-US: Animation Card
```

## zh-CN

当页面宽度方向空间空余，但高度方向空间多余时，可指定 `animation` 为 `card` 使用卡片化风格。

---

## en-US

When the space in the width direction of the page is vacant, but the space in the height direction is surplus, you can specify `animation` as `card` to use card style.

---

```vue
<template>
  <a-carousel
    :autoPlay="true"
    animation-name="card"
    show-arrow="never"
    indicator-position="outer"
    :style="{
      width: '100%',
      height: '240px',
    }"
  >
    <a-carousel-item v-for="image in images" :style="{ width: '60%' }">
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
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04b379e20b6c42f78d17cac99fcf4fd7~tplv-uwbnlip3yd-image.image',
      ],
    };
  },
};
</script>
```
