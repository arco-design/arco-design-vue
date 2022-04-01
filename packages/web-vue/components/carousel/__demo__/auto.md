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
        }"
      />
    </a-carousel-item>
  </a-carousel>
</template>

<script>
export default {
  setup() {
    const images = [
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    ];
    return {
      images
    }
  },
};
</script>
```
