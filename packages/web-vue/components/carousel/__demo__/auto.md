```yaml
title:
  zh-CN: 自动切换
  en-US: Auto
```

## zh-CN

可以通过 `autoPlay` 设置是否自动切换。
可设置 `moveSpeed`, `timingFunc` 实现不同切换幻灯片效果。

---

## en-US

You can set whether to switch automatically through `autoPlay`.
You can set `moveSpeed`, `timingFunc` to achieve different switching slide effects.

---

```vue
<template>
  <a-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :auto-play="true"
    indicator-type="dot"
    show-arrow="hover"
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
