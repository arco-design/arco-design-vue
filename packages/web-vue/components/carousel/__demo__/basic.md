```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

基本用法

---

## en-US

Basic usage

---

```vue
<template>
  <a-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :default-current="2"
    @change="log"
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
  methods: {
    log: console.log,
  },
};
</script>
```
