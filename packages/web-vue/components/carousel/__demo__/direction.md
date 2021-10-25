```yaml
title:
  zh-CN: 切换方向
  en-US: Vertical
```

## zh-CN

默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来使用垂直方向切换。

---

## en-US

By default, the `direction` is `horizontal`. Use the vertical direction switch by setting the `direction` to `vertical`.

---

```vue
<template>
  <a-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    show-arrow="never"
    direction="vertical"
    indicator-position="right"
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
